import mongoose, { Schema, Document, Types } from "mongoose";
export declare enum ProjectStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED"
}
export interface IProject extends Document {
    name: string;
    description: string;
    ownerId: Types.ObjectId;
    status: ProjectStatus;
    memberIds: Types.ObjectId[];
}
export declare const ProjectSchema: Schema;
declare const _default: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Project.d.ts.map