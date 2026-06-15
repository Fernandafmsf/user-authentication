import {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserById,
  returnAllUsers,
  updateUser,
} from "./userRepository.js";
import bcrypt from "bcrypt";
import { ValidationError, NotFoundError } from "../../utils/errors.js";

export const register = async (data) => {
  const { email, password, role } = data;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ValidationError("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // only allow ADMIN if explicitly requested; otherwise default to USER
  const roleToSet = role === "ADMIN" ? "ADMIN" : "USER";

  const user = await createUser(email, hashedPassword, roleToSet);

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const update = async (userId, data) => {
  const { email, password } = data;

  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedUser = await updateUser(userId, {
    email,
    password: hashedPassword,
  });

  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const removeUser = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  await deleteUser(userId);
  return true;
};

export const listUsers = async () => {
  const users = await returnAllUsers();

  return users.map(
    ({ password, ...userWithoutPassword }) => userWithoutPassword,
  );
};

export const getUserById = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
