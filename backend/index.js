import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 8000;

app.use(
  cors({
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    origin: "*",
  })
);


app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
