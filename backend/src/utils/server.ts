import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../routes/routes";
import { v2 as cloudinary } from "cloudinary";
import config from "config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";

function createServer() {
  const cloudinaryCloudName = config.get<string>("cloudinaryCloudName");
  const cloudinaryApiKey = config.get<string>("cloudinaryApiKey");
  const cloudinaryApiSecret = config.get<string>("cloudinaryApiSecret");
  const frontendUrl = config.get<string>("frontendUrl");

  const app = express();

  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  });

  // Set trust proxy
  app.set("trust proxy", 1); // Trust the first proxy in the chain

  // Ensure Static File Serving
  app.use(express.static(path.join(__dirname, "dist")));

  // Set up rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 500 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });

  // Use Helmet to set Content Security Policy and other headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // scriptSrc: ["'self'", frontendUrl],
          // styleSrc: ["'self'", frontendUrl],
        },
      },
    })
  );
  // Apply rate limiting to all requests
  app.use(limiter);

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // To handle FormData

  const allowedOrigins = [
    frontendUrl,
    // "http://localhost:8888", // Netlify Dev server (for local testing)
  ];

  // Configure CORS
  app.use(
    cors({
      origin: (
        origin: string | undefined,
        callback: (err: Error | null, allowed?: boolean) => void
      ) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  routes(app);

  return app;
}

export default createServer;
