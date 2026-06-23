import express from "express";
import {
  createUser,
  findAll,
  deleteUser,
  returnUser,
  updateUser,
} from "../modules/user/userController.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import { login } from "../modules/auth/authService.js";

const router = express.Router();

router.post("/register", createUser);

router.get("/admin", isAdmin, findAll);

router.get("/:id", auth, returnUser);
router.post("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
