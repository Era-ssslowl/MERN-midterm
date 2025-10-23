import mongoose, { Document } from "mongoose";
export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export interface IUser extends Document {
    email: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    avatarUrl: string;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map