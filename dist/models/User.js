import mongoose, { Schema, Document } from "mongoose";
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["USER"] = "USER";
})(UserRole || (UserRole = {}));
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    },
    isActive: { type: Boolean, default: true },
    avatarUrl: { type: String },
}, {
    timestamps: true,
});
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=User.js.map