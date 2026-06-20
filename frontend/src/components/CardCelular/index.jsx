import React from "react";

const CardCelular = ({ celular }) => {
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
    </article>
  );
};

export default CardCelular;
