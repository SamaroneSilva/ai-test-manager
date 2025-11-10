import express from "express";
import Test from "../models/Test.js"; // importa o modelo do MongoDB

const router = express.Router();

// Criar novo teste
router.post("/tests", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ erro: "Campos 'title' e 'description' são obrigatórios." });
    }

    const novoTeste = new Test({ title, description });
    await novoTeste.save();

    res.status(201).json(novoTeste);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar teste", detalhes: erro.message });
  }
});

// Listar todos os testes
router.get("/tests", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar testes", detalhes: erro.message });
  }
});

export default router;
