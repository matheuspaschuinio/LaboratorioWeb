import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { forgot } from "../api/Todo.jsx";

export default function Forgot() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgot({email});
            alert("Verifique sua caixa de entrada para redefinir sua senha!");
            navigate("/");
        } catch (error) {
            alert("Erro ao enviar email: " + error.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Enviar email - Resetar senha</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            
            <div className="flex items-center gap-3 pt-4">
            <button
                
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
             Enviar
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
    )
}