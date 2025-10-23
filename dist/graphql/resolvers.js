import {} from "../types/graphql.js";
import User, { UserRole } from "../models/User.js";
import Project, { ProjectStatus } from "../models/Project.js";
import Task, { TaskStatus } from "../models/Task.js";
import { Types } from "mongoose";
const MAX_LIMIT = 100;
function capLimit(limit) {
    const l = typeof limit === "number" ? Math.max(0, Math.floor(limit)) : 20;
    return Math.min(MAX_LIMIT, l);
}
function normalizeOffset(offset) {
    return Math.max(0, Math.floor(offset ?? 0));
}
const resolvers = {
    Query: {
        users: async (_parent, args) => {
            const limit = capLimit(args.limit);
            const offset = normalizeOffset(args.offset);
            return User.find()
                .sort({ createdAt: 1 })
                .skip(offset)
                .limit(limit)
                .exec();
        },
        projects: async (_parent, args) => {
            const filter = args.filter ?? {};
            const limit = capLimit(filter.limit);
            const offset = normalizeOffset(filter.offset);
            const qParts = [];
            if (filter.q) {
                const regex = new RegExp(filter.q, "i");
                qParts.push({ name: regex });
                qParts.push({ description: regex });
            }
            const base = qParts.length
                ? { $or: qParts }
                : {};
            if (filter.status)
                base.status = filter.status;
            return Project.find(base)
                .sort({ createdAt: 1 })
                .skip(offset)
                .limit(limit)
                .exec();
        },
        project: async (_parent, args) => {
            if (!Types.ObjectId.isValid(args.id)) {
                throw new Error("Invalid project id");
            }
            return Project.findById(args.id).exec();
        },
        tasks: async (_parent, args) => {
            const filter = args.filter ?? {};
            const limit = capLimit(filter.limit);
            const offset = normalizeOffset(filter.offset);
            const q = {};
            if (filter.projectId) {
                if (!Types.ObjectId.isValid(filter.projectId))
                    throw new Error("Invalid projectId");
                q.projectId = filter.projectId;
            }
            if (filter.status)
                q.status = filter.status;
            if (filter.assigneeId) {
                if (!Types.ObjectId.isValid(filter.assigneeId))
                    throw new Error("Invalid assigneeId");
                q.assigneeId = filter.assigneeId;
            }
            if (filter.dueFrom || filter.dueTo) {
                q.dueDate = {};
                if (filter.dueFrom)
                    q.dueDate.$gte = new Date(filter.dueFrom);
                if (filter.dueTo)
                    q.dueDate.$lte = new Date(filter.dueTo);
            }
            return Task.find(q)
                .sort({ createdAt: 1 })
                .skip(offset)
                .limit(limit)
                .exec();
        },
        task: async (_parent, args) => {
            if (!Types.ObjectId.isValid(args.id)) {
                throw new Error("Invalid task id");
            }
            return Task.findById(args.id).exec();
        },
    },
    Mutation: {
        // Users
        createUser: async (_parent, args) => {
            const { email, name, role = UserRole.USER, isActive = true, avatarUrl, } = args.input;
            if (!email || !name)
                throw new Error("email and name are required");
            // unique index will enforce uniqueness but check friendly error
            const exists = await User.findOne({ email }).exec();
            if (exists)
                throw new Error("User with this email already exists");
            const user = new User({ email, name, role, isActive, avatarUrl });
            await user.save();
            return user;
        },
        updateUser: async (_parent, args) => {
            const { id, input } = args;
            if (!Types.ObjectId.isValid(id))
                throw new Error("Invalid user id");
            const user = await User.findById(id).exec();
            if (!user)
                throw new Error("User not found");
            if (input.name !== undefined)
                user.name = input.name;
            if (input.role !== undefined)
                user.role = input.role;
            if (input.isActive !== undefined)
                user.isActive = input.isActive;
            if (input.avatarUrl !== undefined)
                user.avatarUrl = input.avatarUrl;
            await user.save();
            return user;
        },
        deleteUser: async (_parent, args) => {
            const { id } = args;
            if (!Types.ObjectId.isValid(id))
                throw new Error("Invalid user id");
            const res = await User.findByIdAndDelete(id).exec();
            return !!res;
        },
        // Projects
        createProject: async (_parent, args) => {
            const { name, description, ownerId, status = ProjectStatus.ACTIVE, memberIds = [], } = args.input;
            if (!name || !ownerId)
                throw new Error("name and ownerId are required");
            if (!Types.ObjectId.isValid(ownerId))
                throw new Error("Invalid ownerId");
            for (const mid of memberIds)
                if (!Types.ObjectId.isValid(mid))
                    throw new Error("Invalid memberId in memberIds");
            // ensure owner exists
            const owner = await User.findById(ownerId).exec();
            if (!owner)
                throw new Error("Owner not found");
            const project = new Project({
                name,
                description,
                ownerId: new Types.ObjectId(ownerId),
                status,
                memberIds: memberIds.map((m) => new Types.ObjectId(m)),
            });
            await project.save();
            return project;
        },
        updateProject: async (_parent, args) => {
            const { id, input } = args;
            if (!Types.ObjectId.isValid(id))
                throw new Error("Invalid project id");
            const project = await Project.findById(id).exec();
            if (!project)
                throw new Error("Project not found");
            if (input.name !== undefined)
                project.name = input.name;
            if (input.description !== undefined)
                project.description = input.description;
            if (input.status !== undefined)
                project.status = input.status;
            if (input.memberIds !== undefined) {
                for (const mid of input.memberIds)
                    if (!Types.ObjectId.isValid(mid))
                        throw new Error("Invalid memberId in memberIds");
                project.memberIds = input.memberIds.map((m) => new Types.ObjectId(m));
            }
            await project.save();
            return project;
        },
        deleteProject: async (_parent, args) => {
            const { id } = args;
            if (!Types.ObjectId.isValid(id))
                throw new Error("Invalid project id");
            const res = await Project.findByIdAndDelete(id).exec();
            return !!res;
        },
        // Tasks
        createTask: async (_parent, args) => {
            const { projectId, title, status = TaskStatus.TODO, assigneeId, dueDate, } = args.input;
            if (!projectId || !title)
                throw new Error("projectId and title are required");
            if (!Types.ObjectId.isValid(projectId))
                throw new Error("Invalid projectId");
            if (assigneeId && !Types.ObjectId.isValid(assigneeId))
                throw new Error("Invalid assigneeId");
            const project = await Project.findById(projectId).exec();
            if (!project)
                throw new Error("Project not found");
            if (assigneeId) {
                const assignee = await User.findById(assigneeId).exec();
                if (!assignee)
                    throw new Error("Assignee not found");
            }
            const task = new Task({
                projectId: new Types.ObjectId(projectId),
                title,
                status,
                assigneeId: assigneeId ? new Types.ObjectId(assigneeId) : undefined,
                dueDate: dueDate ? new Date(dueDate) : undefined,
            });
            await task.save();
            return task;
        },
        updateTask: async (_parent, args) => {
            const { id, input } = args;
            if (!Types.ObjectId.isValid(id))
                throw new Error("Invalid task id");
            const task = await Task.findById(id).exec();
            if (!task)
                throw new Error("Task not found");
            if (input.title !== undefined)
                task.title = input.title;
            if (input.status !== undefined)
                task.status = input.status;
            if (input.assigneeId !== undefined) {
                if (input.assigneeId === null) {
                    task.assigneeId = undefined;
                }
                else {
                    if (!Types.ObjectId.isValid(input.assigneeId))
                        throw new Error("Invalid assigneeId");
                    const u = await User.findById(input.assigneeId).exec();
                    if (!u)
                        throw new Error("Assignee not found");
                    task.assigneeId = new Types.ObjectId(input.assigneeId);
                }
            }
            if (input.dueDate !== undefined) {
                task.dueDate = input.dueDate ? new Date(input.dueDate) : undefined;
            }
            await task.save();
            return task;
        },
        deleteTask: async (_parent, args) => {
            const { id } = args;
            if (!Types.ObjectId.isValid(id))
                throw new Error("Invalid task id");
            const res = await Task.findByIdAndDelete(id).exec();
            return !!res;
        },
    },
    // Relations
    Project: {
        owner: async (parent) => {
            return User.findById(parent.ownerId).exec();
        },
        members: async (parent) => {
            if (!parent.memberIds || parent.memberIds.length === 0)
                return [];
            return User.find({ _id: { $in: parent.memberIds } }).exec();
        },
    },
    Task: {
        project: async (parent) => {
            return Project.findById(parent.projectId).exec();
        },
        assignee: async (parent) => {
            if (!parent.assigneeId)
                return null;
            return User.findById(parent.assigneeId).exec();
        },
    },
};
export default resolvers;
//# sourceMappingURL=resolvers.js.map