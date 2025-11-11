import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js"; // suas rotas existentes

const app = express();

app.use(cors());
app.use(express.json());

// Rota de login
app.use("/api/auth", authRoutes);

// Rotas de testes (vamos proteger depois)
app.use("/api/tests", testRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
