import express from "express";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";
// this is for envirn
dotenv.config({
  path: "./config/.env",
});

const app = express();

// Database connection goes here
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected...");
});
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.use(errorHandler);

app.listen(process.env.APP_PORT, () =>
  console.log(`Listening on ${process.env.APP_PORT}`)
);
