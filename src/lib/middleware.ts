// src/lib/auth-middleware.ts
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export async function verifyToken(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return { error: 'No authentication token provided', status: 401 }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    await dbConnect()
    
    const user = await User.findById(decoded.userId)
    if (!user || !user.isActive) {
      return { error: 'User not found or inactive', status: 401 }
    }

    return { user, status: 200 }
  } catch (error) {
    return { error: 'Invalid token', status: 401 }
  }
}

export function checkPermission(user: any, permission: string) {
  // Admins have all permissions
  if (user.role === 'admin') {
    return true
  }
  
  // Check if user has specific permission
  return user.permissions.includes(permission)
}
