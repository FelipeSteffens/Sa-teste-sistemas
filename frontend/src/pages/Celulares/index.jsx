import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CardCelular from "../../components/CardCelular";

const Celulares = () => {
  const [celulares, setCelulares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const carregarCelulares = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await api.get("/cellphones/listar");
        setCelulares(response.data);
      } catch (error) {
        console.error("Erro ao carregar celulares", error);
        setErrorMessage("Não foi possível carregar os celulares.");
      } finally {
        setIsLoading(false);
      }
    };

    carregarCelulares();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-cyan-800">Celulares</h1>
        <button className="px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors">
          Novo celular
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Catálogo</h2>

        {isLoading && (
          <p className="text-gray-600">Carregando celulares...</p>
        )}

        {!isLoading && errorMessage && (
          <p className="text-red-600">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && celulares.length === 0 && (
          <p className="text-gray-600">Nenhum celular cadastrado.</p>
        )}

        {!isLoading && !errorMessage && celulares.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {celulares.map((celular) => (
              <CardCelular key={celular.id} celular={celular} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Celulares;
