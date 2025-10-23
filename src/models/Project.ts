import mongoose, { Schema, Document, Types } from "mongoose";

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export interface IProject extends Document {
  name: string;
  description: string;
  ownerId: Types.ObjectId;
  status: ProjectStatus;
  memberIds: Types.ObjectId[];
}

export const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.ACTIVE,
    },
    memberIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IProject>("Project", ProjectSchema);
