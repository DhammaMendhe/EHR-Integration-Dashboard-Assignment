// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbconnect'
import Patient from '@/models/Patient' // or import User if you have a User model

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  // Connect to the database
  await dbConnect()

  // Find user by email
  const user = await Patient.findOne({ email }).select('+password')
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Compare hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // (Optional) Generate a JWT token and set it in a cookie here

  // Return user info (omit sensitive info like password)
  return NextResponse.json({ 
    success: true, 
    message: 'Login successful',
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      // add more fields as needed
    }
  })
}
