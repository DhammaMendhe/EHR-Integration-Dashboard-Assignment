// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbconnect";
import Patient from "@/models/Patient";

export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
    } = await request.json();

    console.log("📝 Registration attempt for:", email);

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "First name, last name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate gender if provided
    if (gender && !['male', 'female', 'other'].includes(gender)) {
      return NextResponse.json(
        { error: "Gender must be 'male', 'female', or 'other'" },
        { status: 400 }
      );
    }

    await connectDB();
    console.log("✅ Database connected");

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return NextResponse.json(
        { error: "A patient with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Prepare patient data
    const patientData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phoneNumber: phoneNumber ? phoneNumber.trim() : undefined,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender: gender || undefined
    };

    // Remove undefined values
    Object.keys(patientData).forEach(key => {
      if (patientData[key as keyof typeof patientData] === undefined) {
        delete patientData[key as keyof typeof patientData];
      }
    });

    console.log("🏥 Creating patient...");

    // Create and save patient
    const patient = new Patient(patientData);

    try {
      const savedPatient = await patient.save();
      console.log("✅ Patient saved successfully with ID:", savedPatient._id);

      return NextResponse.json({
        success: true,
        message: "Patient registered successfully",
        patient: {
          id: savedPatient._id,
          firstName: savedPatient.firstName,
          lastName: savedPatient.lastName,
          email: savedPatient.email,
          phoneNumber: savedPatient.phoneNumber,
          dateOfBirth: savedPatient.dateOfBirth,
          gender: savedPatient.gender,
          createdAt: savedPatient.createdAt
        }
      }, { status: 201 });

    } catch (saveError: any) { // ✅ Type assertion
      console.error("❌ Save Error Details:");
      console.error("Full Error:", saveError);
      console.error("Error Message:", saveError?.message);
      console.error("Error Name:", saveError?.name);
      console.error("Error Code:", saveError?.code);

      // Handle specific MongoDB errors
      if (saveError?.code === 11000) {
        return NextResponse.json({
          error: "Email already exists"
        }, { status: 409 });
      }

      if (saveError?.name === 'ValidationError') {
        const errorMessages = Object.keys(saveError.errors || {}).map(key => ({
          field: key,
          message: saveError.errors[key]?.message || 'Validation error'
        }));

        return NextResponse.json({
          error: "Validation failed",
          details: errorMessages
        }, { status: 400 });
      }

      // Re-throw unexpected errors
      throw saveError;
    }

  } catch (error: any) { // ✅ Type assertion
    console.error("❌ Registration Error:", error);
    console.error("❌ Error Message:", error?.message);

    return NextResponse.json({
      error: "Internal server error",
      message: "Registration failed due to server error",
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, { status: 500 });
  }
}
