import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import User from "./models/User.js";
import Project from "./models/Project.js";
import Task from "./models/Task.js";

// --- Connect to DB ---
const MONGO_URI = "mongodb://root:password@localhost:27017/?authSource=admin";

async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
}

// --- Seed Function ---
async function seedDB() {
  await User.deleteMany({});
  await Project.deleteMany({});
  await Task.deleteMany({});

  // --- Create Users ---
  const roles = ["ADMIN", "USER"] as const;
  const users = [];

  for (let i = 0; i < 10; i++) {
    const user = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(roles),
      isActive: faker.datatype.boolean(),
      avatarUrl: faker.image.avatar(),
    });
    await user.save();
    users.push(user);
  }

  console.log("Users created:", users.length);

  // --- Create Projects ---
  const statuses = ["ACTIVE", "ARCHIVED"] as const;
  const projects = [];

  for (let i = 0; i < 5; i++) {
    const owner = faker.helpers.arrayElement(users);
    const memberIds = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 5 })).map(u => u._id);

    const project = new Project({
      name: faker.company.name(),
      description: faker.lorem.sentences({ min: 2, max: 5 }),
      ownerId: owner._id,
      status: faker.helpers.arrayElement(statuses),
      memberIds,
    });

    await project.save();
    projects.push(project);
  }

  console.log("Projects created:", projects.length);

  // --- Create Tasks ---
  const taskStatuses = ["TODO", "IN_PROGRESS", "DONE"] as const;
  const tasks = [];

  for (let i = 0; i < 20; i++) {
    const project = faker.helpers.arrayElement(projects);
    const assignee = faker.helpers.arrayElement(users);

    const task = new Task({
      projectId: project._id,
      title: faker.hacker.phrase(),
      status: faker.helpers.arrayElement(taskStatuses),
      assigneeId: assignee._id,
      dueDate: faker.date.future({ years: 1 }),
    });

    await task.save();
    tasks.push(task);
  }

  console.log("Tasks created:", tasks.length);
}

// --- Run Seeder ---
(async () => {
  try {
    await connectDB();
    await seedDB();
    console.log("Database seeding complete!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
})();
