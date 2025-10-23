import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { json } from "express";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import mongoose from "mongoose";

const main = async () => {
  dotenv.config();
  const port = process.env.PORT;

  const app = express();

  app.use(cors());
  app.use(json());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const mongo = "mongodb://root:password@mongo:27017";
  if (!mongo) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  await mongoose.connect(
        mongo,
      )

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async () => {
        const user = null;
        return { user };
      },
    }),
  );

  app.listen(port, () => {
    console.log(
      `Server is running on port ${port} \nGraphql on http://localhost:${port}/graphql`,
    );
  });
};

main().catch((err) => {
  console.log(err);
  process.exit();
});
