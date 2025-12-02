// dot env
import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import connect from "./libs/db";
dotenv.config();

const init = async () => {
  try {
    // init express
    const app = express();

    // connect db
    await connect();

    // json parse
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // api test
    app.get("/", (_, res) => {
      res.send("Hello World!");
    });

    // api auth
    app.use("/api/auth", authRoute);

    // start server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {}
};

// start
init();
