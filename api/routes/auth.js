import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import nodemailer from "nodemailer"; 
import User from "../models/User.js";
import { getRegisterValidationMessage } from "../utils/authValidation.js";
import { getSupabaseAdmin } from "../utils/supabaseAdmin.js";
import { login, register, supabaseLogin } from "../controllers/authController.js";

const router = express.Router();

// ================= RATE LIMITERS =================

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    success: false,
    message: "Too many accounts created. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

//  NEW: Forgot Password Rate Limiter
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  message: {
    success: false,
    message: "Too many reset requests. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

//  NEW: Reset Password Rate Limiter
const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many reset attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ========== REGISTER ==========
router.post("/register", registerLimiter,register);

// ========== LOGIN ==========
router.post("/login", loginLimiter,login);

// ========== SUPABASE OAUTH ==========
router.post("/supabase",supabaseLogin);

export default router;
