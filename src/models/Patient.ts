// src/models/Patient.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IPatient extends Document {
  patientId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  medicalInfo: {
    bloodType?: string;
    allergies: string[];
    currentMedications: any[];
    medicalConditions: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // Admin who created this patient
  lastModifiedBy?: string; // Admin who last modified
}

const PatientSchema = new Schema<IPatient>({
  patientId: { 
    type: String, 
    required: true, 
    unique: true,
    default: () => 'PAT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  medicalInfo: {
    bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    allergies: [{ type: String }],
    currentMedications: [{ type: Schema.Types.Mixed }],
    medicalConditions: [{ type: String }]
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

export default mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema)
