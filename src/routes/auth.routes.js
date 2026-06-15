import express from "express";
import { login } from '../modules/auth/authController.js';

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);

export default router;