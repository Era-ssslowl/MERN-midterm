import { type ProjectFilter, type TaskFilter } from "../types/graphql.js";
import { UserRole } from "../models/User.js";
import { ProjectStatus, type IProject } from "../models/Project.js";
import { TaskStatus, type ITask } from "../models/Task.js";
declare const resolvers: {
    Query: {
        users: (_parent: unknown, args: {
            limit?: number;
            offset?: number;
        }) => Promise<(import("mongoose").Document<unknown, {}, import("../models/User.js").IUser, {}, {}> & import("../models/User.js").IUser & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[]>;
        projects: (_parent: unknown, args: {
            filter?: ProjectFilter;
        }) => Promise<(import("mongoose").Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[]>;
        project: (_parent: unknown, args: {
            id: string;
        }) => Promise<(import("mongoose").Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null>;
        tasks: (_parent: unknown, args: {
            filter?: TaskFilter;
        }) => Promise<(import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[]>;
        task: (_parent: unknown, args: {
            id: string;
        }) => Promise<(import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null>;
    };
    Mutation: {
        createUser: (_parent: unknown, args: {
            input: {
                email: string;
                name: string;
                role?: UserRole;
                isActive?: boolean;
                avatarUrl?: string;
            };
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/User.js").IUser, {}, {}> & import("../models/User.js").IUser & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
        updateUser: (_parent: unknown, args: {
            id: string;
            input: Partial<{
                name: string;
                role: UserRole;
                isActive: boolean;
                avatarUrl: string;
            }>;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/User.js").IUser, {}, {}> & import("../models/User.js").IUser & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
        deleteUser: (_parent: unknown, args: {
            id: string;
        }) => Promise<boolean>;
        createProject: (_parent: unknown, args: {
            input: {
                name: string;
                description?: string;
                ownerId: string;
                status?: ProjectStatus;
                memberIds?: string[];
            };
        }) => Promise<import("mongoose").Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
        updateProject: (_parent: unknown, args: {
            id: string;
            input: Partial<{
                name: string;
                description: string;
                status: ProjectStatus;
                memberIds: string[];
            }>;
        }) => Promise<import("mongoose").Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
        deleteProject: (_parent: unknown, args: {
            id: string;
        }) => Promise<boolean>;
        createTask: (_parent: unknown, args: {
            input: {
                projectId: string;
                title: string;
                status?: TaskStatus;
                assigneeId?: string;
                dueDate?: string;
            };
        }) => Promise<import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
        updateTask: (_parent: unknown, args: {
            id: string;
            input: Partial<{
                title: string;
                status: TaskStatus;
                assigneeId: string | null;
                dueDate: string | null;
            }>;
        }) => Promise<import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
        deleteTask: (_parent: unknown, args: {
            id: string;
        }) => Promise<boolean>;
    };
    Project: {
        owner: (parent: IProject) => Promise<(import("mongoose").Document<unknown, {}, import("../models/User.js").IUser, {}, {}> & import("../models/User.js").IUser & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null>;
        members: (parent: IProject) => Promise<(import("mongoose").Document<unknown, {}, import("../models/User.js").IUser, {}, {}> & import("../models/User.js").IUser & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[]>;
    };
    Task: {
        project: (parent: ITask) => Promise<(import("mongoose").Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null>;
        assignee: (parent: ITask) => Promise<(import("mongoose").Document<unknown, {}, import("../models/User.js").IUser, {}, {}> & import("../models/User.js").IUser & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null>;
    };
};
export default resolvers;
//# sourceMappingURL=resolvers.d.ts.map