import { gql } from "graphql-tag";
const typeDefs = gql `
  enum Role {
    ADMIN
    USER
  }

  enum ProjectStatus {
    ACTIVE
    ARCHIVED
  }

  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: Role!
    isActive: Boolean!
    avatarUrl: String
    createdAt: String!
    updatedAt: String!
  }

  type Project {
    id: ID!
    name: String!
    description: String
    owner: User!
    status: ProjectStatus!
    members: [User!]!
    createdAt: String!
    updatedAt: String!
  }

  type Task {
    id: ID!
    project: Project!
    title: String!
    status: TaskStatus!
    assignee: User
    dueDate: String
    createdAt: String!
    updatedAt: String!
  }

  input PaginationInput {
    limit: Int = 20
    offset: Int = 0
  }

  input ProjectFilterInput {
    q: String
    status: ProjectStatus
    limit: Int = 20
    offset: Int = 0
  }

  input TaskFilterInput {
    projectId: ID
    status: TaskStatus
    assigneeId: ID
    dueFrom: String
    dueTo: String
    limit: Int = 20
    offset: Int = 0
  }

  type Query {
    users(limit: Int = 50, offset: Int = 0): [User!]!
    projects(filter: ProjectFilterInput): [Project!]!
    project(id: ID!): Project
    tasks(filter: TaskFilterInput): [Task!]!
    task(id: ID!): Task
  }

  # Create / Update inputs
  input CreateUserInput {
    email: String!
    name: String!
    role: Role = USER
    isActive: Boolean = true
    avatarUrl: String
  }

  input UpdateUserInput {
    name: String
    role: Role
    isActive: Boolean
    avatarUrl: String
  }

  input CreateProjectInput {
    name: String!
    description: String
    ownerId: ID!
    status: ProjectStatus = ACTIVE
    memberIds: [ID!]
  }

  input UpdateProjectInput {
    name: String
    description: String
    status: ProjectStatus
    memberIds: [ID!]
  }

  input CreateTaskInput {
    projectId: ID!
    title: String!
    status: TaskStatus = TODO
    assigneeId: ID
    dueDate: String
  }

  input UpdateTaskInput {
    title: String
    status: TaskStatus
    assigneeId: ID
    dueDate: String
  }

  type Mutation {
    # Users
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    # Projects
    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!

    # Tasks
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Boolean!
  }
`;
export default typeDefs;
//# sourceMappingURL=typeDefs.js.map