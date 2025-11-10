import express from "express";
import cors from "cors";
import testsRoutes from "./routes/testsRoutes.js";
import mongoose from "mongoose";

const app = express();

// Middlewares
app.use(cors()); // ✅ Habilita CORS para todas as rotas
app.use(express.json());

// Rotas
app.use("/api", testsRoutes);

// MongoDB
mongoose
  .connect("mongodb://localhost:27017/ai-test-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

// Start do servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
