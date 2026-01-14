import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import type { AuthRequest } from "../middleware/auth.js";
import { pool } from "../config/database.js";
import { signToken } from "../utils/jwt";

const PASSWORD_SALT_STRENGTH = 10;
const MAX_COOKIE_AGE = 7 * 24 * 60 * 60 * 1000;

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

      const token = signToken(result.rows[0].id);

      res.cookie("access_token",
        token,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: MAX_COOKIE_AGE,
        },
      );

      return res.status(201).json({
        message: "User successfully registered",
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

      const token = signToken(user.id);

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_COOKIE_AGE,
      });

      return res.status(200).json({
        message: "User successfully logged in",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("LoginPage error:", error);
      return res.status(500).json({
        message: "Server Error",
      });
    }
  };

  public static logout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged out",
    });
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
