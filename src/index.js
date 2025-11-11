import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import testsRoutes from "./routes/testsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/tests", testsRoutes);

// Conexão com o MongoDB
mongoose
  .connect("mongodb://localhost:27017/ai-test-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
