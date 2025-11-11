import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  // Usuário de teste fixo
  if (email === "admin@teste.com" && password === "123456") {
    const token = jwt.sign({ email }, "segredo_super_secreto", { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Credenciais inválidas" });
};
