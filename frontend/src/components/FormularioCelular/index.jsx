import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

const FormularioCelular = ({ onCelularCriado }) => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setMarca("");
    setModelo("");
    setCor("");
    setPreco("");
    setDescricao("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await api.post("/cellphones/criar", {
        marca,
        modelo,
        cor,
        preco: Number(preco),
        descricao,
      });

      resetForm();
      toast.success("Celular cadastrado com sucesso!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      onCelularCriado(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar celular", error);
      toast.error("Erro ao cadastrar celular.", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-md p-2 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-800">
        Novo celular
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset>
          <label htmlFor="marca" className="block text-sm font-medium mb-1">
            Marca:
          </label>
          <input
            type="text"
            id="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="modelo" className="block text-sm font-medium mb-1">
            Modelo:
          </label>
          <input
            type="text"
            id="modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="cor" className="block text-sm font-medium mb-1">
            Cor:
          </label>
          <input
            type="text"
            id="cor"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="preco" className="block text-sm font-medium mb-1">
            Preço:
          </label>
          <input
            type="number"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            min="0"
            step="0.01"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="descricao" className="block text-sm font-medium mb-1">
            Descrição:
          </label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="3"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
          />
        </fieldset>

        <button
          type="submit"
          disabled={isSaving}
          className={`w-full p-2 rounded-lg text-white transition-colors ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-cyan-700 hover:bg-cyan-800 cursor-pointer"
          }`}
        >
          {isSaving ? "Salvando..." : "Cadastrar celular"}
        </button>
      </form>
    </div>
  );
};

export default FormularioCelular;
