import {
  register,
  listUsers,
  removeUser,
  getUserById,
  update,
} from "./userService.js";

export const createUser = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    const user = await register({ email, password, role });
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

export const findAll = async (req, res, next) => {
  try {
    const users = await listUsers();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await removeUser(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

export const returnUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  const { email, password } = req.body;

  try {
    const updatedUser = await update(id, { email, password });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};
