import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Particles } from "react-tsparticles";
import logo from "./logo.png";

export default function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Corrigido o endpoint
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/tests");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao autenticar");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white text-gray-900 overflow-hidden">
      {/* Fundo animado */}
      <Particles
        options={{
          background: { color: "#f8fafc" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 90 } },
          },
          particles: {
            color: { value: "#60A5FA" },
            links: {
              color: "#93C5FD",
              distance: 140,
              enable: true,
              opacity: 0.12,
              width: 1,
            },
            move: { enable: true, speed: 0.8, random: true, outModes: "out" },
            number: { value: 35, density: { enable: true, area: 900 } },
            opacity: { value: 0.25 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Conteúdo central */}
      <div className="relative z-10 w-full max-w-4xl mx-6">
        {/* Cabeçalho */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center gap-3">
            <img src={logo} alt="Logo" className="w-40 h-40 object-contain" />
          </div>
        </header>

        {/* Corpo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Descrição lateral */}
          <div className="px-6 py-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <h2 className="text-3xl font-extrabold mb-3">Bem-vindo de volta</h2>
            <p className="text-gray-600 mb-6">
              Entre com sua conta para acessar e gerenciar os casos de teste automatizados da sua equipe.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Liste, crie e edite testes</li>
              <li>• Visualize histórico de execução</li>
              <li>• Integre com pipelines</li>
            </ul>
          </div>

          {/* Formulário de login */}
          <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto w-full">
            <h3 className="text-xl font-semibold mb-4">Acesse sua conta</h3>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <label className="block text-sm text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              required
            />

            <label className="block text-sm text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              required
            />

            <div className="flex items-center justify-between mb-4">
              <a className="text-sm text-blue-600 hover:underline" href="#">
                Esqueci a senha
              </a>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-sm"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
