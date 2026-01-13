import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import type { AuthRequest } from "../middleware/auth.js";
import { pool } from "../config/database.js";
import jwt from "jsonwebtoken";

const PASSWORD_SALT_STRENGTH = 10;
const JWT_SECRET_PLACEHOLDER = "my_jwt_secret_1234";

export class AuthController {
  public static register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;

    try {
      if (!email || !password || !name) {
        return res.status(400).json({
          error: "Please enter valid data (email, password and name).",
        });
      }

      const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if (userExists.rows.length > 0) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_STRENGTH);

      const result = await pool.query("INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name", [email, hashedPassword, name]);

      const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET || JWT_SECRET_PLACEHOLDER, { expiresIn: "7d" });

      return res.status(201).json({
        message: "User successfully registered",
        token,
        user: result.rows[0],
      });

    } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  };

  public static login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if (userExists.rows.length === 0) {
        return res.status(401).json({
          message: "Invalid credentials.",
        });
      }

      const user = userExists.rows[0];

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign({
          userId: user.id,
        }, process.env.JWT_SECRET || JWT_SECRET_PLACEHOLDER,
        { expiresIn: "7d" },
      );

      return res.status(200).json({
        message: "User successfully logged in",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  };

  public static getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;

    try {
      const result = await pool.query("SELECT id, email, name, created_at  FROM users WHERE id = $1", [userId]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Invalid credentials",
        });
      }

      return res.status(200).json({
        user: result.rows[0],
      });

    } catch (error) {
      console.error("Get profile error:", error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  };
}
