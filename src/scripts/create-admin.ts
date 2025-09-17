// src/scripts/create-admin.ts
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import dbConnect from '../lib/dbconnect'

async function createAdmin() {
  try {
    await dbConnect()

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@ehrsystem.com' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = new User({
      firstName: 'System',
      lastName: 'Administrator',
      email: 'admin@ehrsystem.com',
      password: hashedPassword,
      role: 'admin',
      permissions: [
        'patients:create',
        'patients:read',
        'patients:update',
        'patients:delete',
        'users:manage',
        'appointments:manage',
        'reports:view'
      ],
      isActive: true
    })

    await admin.save()
    console.log('✅ Admin user created successfully!')
    console.log('Email: admin@ehrsystem.com')
    console.log('Password: admin123')

  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    mongoose.disconnect()
  }
}

createAdmin()
