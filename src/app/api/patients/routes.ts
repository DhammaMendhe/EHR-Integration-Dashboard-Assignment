// create and logiin patients

// src/app/api/patients/route.ts
import { NextRequest, NextResponse } from 'next/server'
import  connectDB  from '@/lib/dbconnect'
import Patient from '@/models/Patient'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    let query = {}

    // Search functionality
    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { patientId: { $regex: search, $options: 'i' } },
          { phoneNumber: { $regex: search, $options: 'i' } }
        ]
      }
    }

    const patients = await Patient.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Patient.countDocuments(query)

    return NextResponse.json({
      success: true,
      patients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get patients error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const patientData = await request.json()
    await connectDB()

    const newPatient = new Patient(patientData)
    await newPatient.save()

    return NextResponse.json({
      success: true,
      message: 'Patient created successfully',
      patient: { ...newPatient.toObject(), password: undefined }
    }, { status: 201 })

  } catch (error) {
    console.error('Create patient error:', error)
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    )
  }
}

