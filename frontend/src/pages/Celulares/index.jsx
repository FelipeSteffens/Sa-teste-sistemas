import React from "react";

const Celulares = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-cyan-800">Celulares</h1>
        <button className="px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors">
          Novo celular
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Catálogo</h2>
        <p className="text-gray-600">
          A listagem dos celulares será conectada à API na próxima etapa.
        </p>
      </div>
    </div>
  );
};

export default Celulares;
