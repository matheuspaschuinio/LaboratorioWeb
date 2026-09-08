import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/Todo.jsx";

export default function UserForm() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await createUser({nome, email, senha});
            navigate("/login");
        } catch (error) {
            alert("Erro ao criar usuário: " + (error.response?.data?.message || error.message));
        } finally {
            setSaving(false);
        }
    };

    return (
            <div className="max-w-xl mx-auto p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar usuário</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border rounded px-3 py-2"
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full border rounded px-3 py-2"
            />
            </div>
            

            <div className="flex items-center gap-3 pt-4">
            <button
                disabled={saving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
                {saving ? "Salvando..." : "Salvar"}
            </button>
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
            >
                Cancelar
            </button>
            </div>
        </form>
        </div>
    );
}