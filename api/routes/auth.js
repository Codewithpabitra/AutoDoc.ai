import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import nodemailer from "nodemailer"; 
import User from "../models/User.js";
import { getRegisterValidationMessage } from "../utils/authValidation.js";
import { getSupabaseAdmin } from "../utils/supabaseAdmin.js";
import { loginLimiter, registerLimiter, forgotPasswordLimiter, resetPasswordLimiter } from "../middleware/rateLimiter.js";
import { register,login , supabaseLogin} from "../controllers/authController.js"

const router = express.Router();

// ================= RATE LIMITERS =================


// ========== REGISTER ==========
router.post("/register", registerLimiter,register);

// ========== LOGIN ==========
router.post("/login", loginLimiter,login);

// ========== SUPABASE OAUTH ==========
router.post("/supabase",supabaseLogin);

export default router;
