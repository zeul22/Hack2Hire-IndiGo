import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as client from "prom-client";
import responseTime from "response-time";
const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;

const reqRestTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "This tells how much time is taken by req & res",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

const totalReqCounter = new client.Counter({
  name: "total_req",
  help: "Tells total req",
});

app.use(
  responseTime((req, res, time) => {
    totalReqCounter.inc();
    reqRestTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);

collectDefaultMetrics({
  register: client.register,
});

import { createLogger, transports } from "winston";
import LokiTransport from "winston-loki";

const options = {
  transports: [
    new LokiTransport({
      labels: {
        appName: "express",
      },
      host: "http://127.0.0.1:3100",
    }),
  ],
};
const logger = createLogger(options);

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

// Metrics
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

app.get("/", (req, res) => {
  logger.info("Req came on / router, This is working very well!");
  res.status(200).json({ Hello: "World" });
});
export { app };
