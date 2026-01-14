import type { Express } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.js";

export default function routes(app: Express) {
  app.get("/healthcheck", (req, res) => {
    return res.send("OK");
  });
  app.post("/api/auth/register", AuthController.register);
  app.post("/api/auth/login", AuthController.login);
  app.post("/api/auth/logout", AuthController.logout);
  app.get("/api/auth/profile", authMiddleware, AuthController.getProfile);
};