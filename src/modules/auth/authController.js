import { login as loginService } from "./authService.js";


export const login = async (req, res) => {
  console.log("Entrou no login controller");
  const { email, password } = req.body;
  console.log("Email:", email);

  try {
    const token = await loginService({ email, password });
    console.log('token' ,token); 
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  
}