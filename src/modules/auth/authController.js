import { login as loginService } from "./authService.js";


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
  
}