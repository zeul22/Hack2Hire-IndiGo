import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(urlencoded());
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

import flighRouter from "./routes/flight.routes.js";
import userRouter from "./routes/user.routes.js";
// Routes
app.use("/flights", flighRouter);
app.use("/user", userRouter);


export { app };
