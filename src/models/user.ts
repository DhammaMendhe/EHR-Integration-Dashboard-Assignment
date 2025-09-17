// import mongoose, { Schema, Document } from "mongoose";
// import { Content } from "next/font/google";

// export interface Message extends Document {
//   content: string;
//   createAt: Date;
// }

// const meesageSchema: Schema<Message> = new Schema({
//   content: {
//     type: String,
//     required: true,
//   },
//   createAt: {
//     type: Date,
//     required: true,
//     default: Date.now,
//   },
// });

// export interface User extends Document {
//   username: string;
//   email: string;
//   password: string;
//   verifyCode: string;
//   verifyCodeExpiry: Date;
//   isVerified: boolean;
//   isAcceptingMessage: boolean;
//   Message: Message[];
//   createAt: Date;
//   messages: Message[];
// }

// const UserSchema: Schema<User> = new Schema({
//   username: {
//     type: String,
//     required: [true, "username is required"],
//     trim: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: [true, "email is required"],
//     unique: true,
//     match: [/.+\@.+\..+/, "please use a valid email address"],
//   },
//   verifyCode: {
//     type: String,
//     required: [true, "verify code is required"],
//   },
//   verifyCodeExpiry: {
//     type: Date,
//     required: [true, "verifyCodeExpiry is required"],
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   messages: [meesageSchema],

//   createAt: {
//     type: Date,
//     required: true,
//     default: Date.now,
//   },
// });

// // only this is user contains only for this User type it uses typescript for type of user
// const UserModel =
//   (mongoose.models.User as mongoose.Model<User>) ||
//   mongoose.model<User>("User", UserSchema);


// export default UserModel;
// src/models/user.ts (or User.ts)
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff';
  permissions: string[];
  isActive: boolean; // ✅ Make sure this exists
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
  isActive: { type: Boolean, default: true } // ✅ Add this field
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
