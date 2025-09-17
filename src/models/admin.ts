// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff';
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { 
    type: String, 
    enum: ['admin', 'doctor', 'nurse', 'staff'], 
    required: true,
    default: 'staff'
  },
  permissions: [{
    type: String,
    enum: [
      'patients:create',
      'patients:read',
      'patients:update',
      'patients:delete',
      'users:manage',
      'appointments:manage',
      'reports:view'
    ]
  }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
