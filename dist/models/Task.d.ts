import mongoose, { Document, Types } from "mongoose";
export declare enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export interface ITask extends Document {
    projectId: Types.ObjectId;
    title: string;
    status: TaskStatus;
    assigneeId?: Types.ObjectId | undefined;
    dueDate?: Date | undefined;
}
declare const _default: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask, {}, {}> & ITask & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Task.d.ts.map