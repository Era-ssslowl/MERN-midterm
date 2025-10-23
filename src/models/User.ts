import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser extends Document {
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isActive: { type: Boolean, default: true },
    avatarUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>("User", UserSchema);
