import mongoose from "mongoose";

const ConnectDb = () => {
    const MongoUrl = process.env.MONGO_URL || "";
    console.log(MongoUrl,"mongodb");
    

  try {
    mongoose
      .connect(MongoUrl)
      .then(() => {
        console.log("connected to mongodb");
      })
      .catch(() => {
        console.log("disconnected to mongoDb");
      });
  } catch (e: any) {
    console.error(e.message);
  }
};

export default ConnectDb;
