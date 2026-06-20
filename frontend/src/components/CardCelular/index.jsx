import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CardCelular = ({ celular, onEditar, onExcluir }) => {
  const formatarPreco = (preco) => {
    const valor = Number(preco);

    if (Number.isNaN(valor)) {
      return "-";
    }

    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-cyan-800">{celular.modelo}</h3>
          <p className="text-sm text-gray-500">{celular.marca}</p>
        </div>

        <span className="text-sm font-semibold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">
          {formatarPreco(celular.preco)}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold text-gray-800">Cor:</span>{" "}
          {celular.cor || "-"}
        </p>
        <p className="text-gray-600">{celular.descricao || "Sem descrição."}</p>
      </div>

      <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onEditar(celular)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-cyan-700 border border-cyan-700 rounded-lg hover:bg-cyan-50 transition-colors"
        >
          <FaEdit size={14} />
          Editar
        </button>
        <button
          type="button"
          onClick={() => onExcluir(celular)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition-colors"
        >
          <FaTrash size={14} />
          Excluir
        </button>
      </div>
    </article>
  );
};

export default CardCelular;
