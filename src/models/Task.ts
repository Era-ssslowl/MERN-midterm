import mongoose, { Schema, Document, Types } from "mongoose";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface ITask extends Document {
  projectId: Types.ObjectId;
  title: string;
  status: TaskStatus;
  assigneeId?: Types.ObjectId | undefined;
  dueDate?: Date | undefined;
}

const TaskSchema: Schema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    assigneeId: { type: Schema.Types.ObjectId, ref: "User" },
    dueDate: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model<ITask>("Task", TaskSchema);
