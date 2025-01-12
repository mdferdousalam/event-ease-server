import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import apiLimiter from "./app/middlewares/rateLimiter";
import performanceLogger from "./app/middlewares/performancLogger";
import sanitizeRequest from "./app/middlewares/requestSanitizeer";

const app: Application = express();

// Security middleware
app.use(helmet());

//parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Define allowed origins
const allowedOrigins = ["http://localhost:3000"];

// Configure CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use("/api/", apiLimiter);

// Performance Logger
app.use(performanceLogger);
//request sanitization
app.use(sanitizeRequest);

// application routes
app.get("/", (req: Request, res: Response) => {
  res.send(`Server health is good and running well`);
});

//routes
app.use("/api/v1", router);
//globalErrorHandler
app.use(globalErrorHandler);
//Not Found
app.use(notFound);

export default app;
