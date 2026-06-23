import { findUserByEmail } from "../user/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { add as blacklistAdd } from "../../utils/tokenBlacklist.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (data) => {
  const { email, password } = data;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  //Gerar token jwt
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export const logout = async (token) => {
  if (!token) return false;
  return blacklistAdd(token);
};
