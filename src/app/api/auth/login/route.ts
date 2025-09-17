// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  
  // Simple validation for now
  if (email === 'send2dhammadipmendhe@gmail.com' && password === 'password123') {
    return NextResponse.json({ 
      success: true, 
      message: 'Login successful' 
    })
  }
  
  return NextResponse.json({ 
    error: 'Invalid credentials' 
  }, { status: 401 })
}
