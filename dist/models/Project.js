import mongoose, { Schema, Document, Types } from "mongoose";
export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["ACTIVE"] = "ACTIVE";
    ProjectStatus["ARCHIVED"] = "ARCHIVED";
})(ProjectStatus || (ProjectStatus = {}));
export const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: Object.values(ProjectStatus),
        default: ProjectStatus.ACTIVE,
    },
    memberIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true,
});
export default mongoose.model("Project", ProjectSchema);
//# sourceMappingURL=Project.js.map