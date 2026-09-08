import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { reset } from "../api/Todo.jsx"; 

export default function ResetPassword() {
    const [novaSenha, setNovaSenha] = useState("");
    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Token de segurança não encontrado. Volte e solicite o e-mail novamente.");
            return;
        }

        try {
            await reset({ token, novaSenha });
            alert("Senha redefinida com sucesso!");
            navigate("/login");
            
        } catch (error) {
            alert("Erro ao redefinir a senha: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8 bg-white rounded-xl border border-gray-200 shadow-sm mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar Nova Senha</h2>
            
            {!token ? (
                <p className="text-red-500">Link inválido. Por favor, solicite a recuperação de senha novamente.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nova Senha</label>
                        <input
                            type="password"
                            required
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Digite sua nova senha"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                        >
                            Salvar Nova Senha
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}