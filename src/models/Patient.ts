// src/models/Patient.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  patientId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema<IPatient>({
  patientId: { 
    type: String, 
    required: true, 
    unique: true,
    default: () => 'PAT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  },
  firstName: { 
    type: String, 
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: { 
    type: String, 
    required: [true, 'Last name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phoneNumber: { 
    type: String,
    required: false,
    trim: true
  },
  dateOfBirth: { 
    type: Date,
    required: false
  },
  gender: { 
    type: String,
    enum: ['male', 'female', 'other'],
    required: false
  },
  // ✅ Make address completely optional - no required fields
  address: {
    street: { type: String, required: false, default: '' },
    city: { type: String, required: false, default: '' },
    state: { type: String, required: false, default: '' },
    zipCode: { type: String, required: false, default: '' },
    country: { type: String, default: 'India' }
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

// ✅ Delete existing model from cache
delete mongoose.models.Patient;

export default mongoose.model<IPatient>('Patient', PatientSchema);
