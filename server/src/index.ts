// dot env
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoute from "./routes/auth.route";
import connect from "./libs/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import fasilitasRoute from "./routes/fasilitas.route";
import roomTypeRoute from "./routes/roomType.route";
import hotelRoute from "./routes/hotel.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import roomRoute from "./routes/room.route";
import galleryRoute from "./routes/gallery.route";
const init = async () => {
  try {
    // init express
    const app = express();

    // cookie
    app.use(cookieParser());

    // cors
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true, // izin cookie, session, token HttpOnly
      })
    );

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

    // api fasilitas
    app.use("/api/fasilitas", fasilitasRoute);

    // api room type
    app.use("/api/room-type", roomTypeRoute);

    // api room
    app.use("/api/room", roomRoute);

    // api hotels
    app.use("/api/hotel", hotelRoute);

    // api gallery
    app.use("/api/gallery", galleryRoute);

    // next middleware
    app.use(errorMiddleware);

    // start server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {}
};

// start
init();
