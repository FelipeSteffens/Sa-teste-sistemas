import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import Modal from "../Modal";
import CriarUsuario from "../CriarUsuario";

const FormularioLogin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.get("/users/listar");
      const usuarioEncontrado = response.data.find(
        (usuario) => usuario.email === email && usuario.senha === senha
      );

      if (!usuarioEncontrado) {
        toast.error("Usuário não encontrado. Verifique o email e senha.", {
          autoClose: 3000,
          hideProgressBar: true,
        });
        return;
      }

      login(usuarioEncontrado);
      toast.success("Login realizado com sucesso!", { autoClose: 2000 });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Erro ao verificar usuário", error);
      toast.error("Erro ao conectar com o servidor.", { autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Entrar</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <fieldset>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            data-testid="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            data-testid="login-password"
            minLength={8}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </fieldset>

        <button
          type="submit"
          data-testid="login-submit"
          disabled={isLoading}
          className={`w-full text-white p-2 rounded-lg transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-cyan-700 hover:bg-cyan-800"
          }`}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="flex justify-between mt-4 text-sm">
        <button
          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Esqueceu sua senha?
        </button>
        <button
          data-testid="open-register"
          onClick={() => setIsModalOpen(true)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Criar Conta
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CriarUsuario onUsuarioCriado={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default FormularioLogin;
