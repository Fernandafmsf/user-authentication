import {
  login as loginService,
  logout as logoutService,
} from "./authService.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginService({ email, password });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token was not provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    await logoutService(token);
    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
