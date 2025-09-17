// src/lib/validation.ts
import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be 8+ characters'),
  phoneNumber: z.string().min(10, 'Valid phone number required'),
  dateOfBirth: z.string().min(1, 'Date of birth required'),
  gender: z.enum(['male', 'female', 'other'])
})

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password required')
})
