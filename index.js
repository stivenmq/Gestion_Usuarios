
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDb } from "./database.js";

import userRoutes from "./routes/user.routes.js";


connectDb();
const app = express();

app.set("Port", process.env.PORT || 4000);
app.use(morgan("dev"));
app.use(cors({ origin: "localhost:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/user",userRoutes),


app.listen(app.get("Port"), () => {
  console.log("servidor escuchando por el puerto", app.get("Port"));
});