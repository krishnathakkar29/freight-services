import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
const app = express();

const port = process.env.PORT || 8000;

connectDB();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    origin: "*",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/users", userRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
