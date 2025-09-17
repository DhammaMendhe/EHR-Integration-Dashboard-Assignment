// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/dbconnect'
import Patient from '@/models/Patient'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, phoneNumber, dateOfBirth, gender } = await request.json()
    
    await connectDB()
    
    // Check existing user
    const existingPatient = await Patient.findOne({ email })
    if (existingPatient) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create patient
    const patient = new Patient({
      firstName, lastName, email, 
      password: hashedPassword, 
      phoneNumber, dateOfBirth, gender
    })
    
    await patient.save()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful' 
    }, { status: 201 })
    
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
