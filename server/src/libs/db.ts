import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "", {
      dbName: "db-hotel",
    });

    return Promise.resolve("Database connected");
  } catch (error) {
    return Promise.reject(error);
  }
};

// export
export default connect;
