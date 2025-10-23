import mongoose, { Mongoose } from "mongoose";

let mongo: Mongoose | null = null;

const connectDB = async () => {
  if (mongo) {
    console.log("Db is already connected");
    return mongo;
  }
  try {
    mongo = await mongoose.connect(
      "mongodb://root:example@localhost:27017/?authSource=admin",
    ); //TODO: Make read value from .env
    console.log("Mongo db is connected");
    return mongo;
  } catch (err) {
    console.log("error while connecting to DB => " + err);
  }
};
export default connectDB;
