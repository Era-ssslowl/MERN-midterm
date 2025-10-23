import mongoose, { Schema, Document, Types } from "mongoose";
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "TODO";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["DONE"] = "DONE";
})(TaskStatus || (TaskStatus = {}));
const TaskSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.TODO,
    },
    assigneeId: { type: Schema.Types.ObjectId, ref: "User" },
    dueDate: { type: Date },
}, { timestamps: true });
export default mongoose.model("Task", TaskSchema);
//# sourceMappingURL=Task.js.map