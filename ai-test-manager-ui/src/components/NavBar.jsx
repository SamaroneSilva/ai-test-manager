import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function TestsList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "http://localhost:3000/api/tests";

  const fetchTests = () => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => setTests(res.data))
      .catch((err) => console.error("Erro ao carregar testes:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleCreateTest = (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Preencha todos os campos!");

    axios
      .post(API_URL, { title, description })
      .then(() => {
        setTitle("");
        setDescription("");
        setIsModalOpen(false);
        fetchTests();
      })
      .catch((err) => console.error("Erro ao criar teste:", err));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* 🔹 Menu superior */}
      <Navbar />

      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            📋 Testes cadastrados
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow"
          >
            Novo teste
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">Criar novo teste</h2>
              <form className="flex flex-col gap-3" onSubmit={handleCreateTest}>
                <input
                  type="text"
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow"
                  >
                    Criar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lista de testes */}
        {loading ? (
          <p>Carregando...</p>
        ) : tests.length === 0 ? (
          <p className="text-gray-600">Nenhum teste encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-2xl p-5 shadow border border-gray-100 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
                <p className="text-gray-600 mb-3">{t.description}</p>
                <p className="text-sm text-gray-400">
                  Criado em: {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
