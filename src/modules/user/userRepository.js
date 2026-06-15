import prisma from "../../database/prisma.js";

export const createUser = async (email, password, role) => {
  const data = {
    email: email,
    password: password,
  };

  if (role) data.role = role;

  const user = await prisma.user.create({
    data,
  });
  return user;
};

export const deleteUser = async (userId) => {
  await prisma.user.delete({
    where: { id: Number(userId) },
  });
};

export const returnAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const returnUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });
  return user;
};

export const updateUser = async (userId, data) => {
  const updatedUser = await prisma.user.update({
    where: { id: Number(userId) },
    data: data,
  });
  return updatedUser;
};

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return user;
};

export const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  return user;
};
