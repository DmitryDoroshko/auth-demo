import type { Express } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware";
import { AuthController } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.types";

export default function authRoutes(app: Express) {
  app.get("/healthcheck", (req, res) => {
    return res.send("OK");
  });
  app.post("/api/auth/register", validate(registerSchema), AuthController.register);
  app.post("/api/auth/login", validate(loginSchema), AuthController.login);
  app.post("/api/auth/logout", AuthController.logout);
  app.get("/api/auth/profile", authMiddleware, AuthController.getProfile);
};