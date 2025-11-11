import Test from "../models/Test.js";

// GET - listar todos os testes
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar testes", error });
  }
};

// POST - criar novo teste
export const createTest = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTest = new Test({ title, description });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar teste", error });
  }
};
