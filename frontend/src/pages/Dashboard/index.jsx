import React, { useEffect, useState } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import api from "../../services/api";


const Dashboard = () => {
  const [totalCelulares, setTotalCelulares] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const carregarTotalCelulares = async () => {
      try {
        const response = await api.get("/cellphones/listar");
        setTotalCelulares(Array.isArray(response.data) ? response.data.length : 0);
      } catch (error) {
        console.error("Erro ao carregar total de celulares", error);
        setErrorMessage("Não foi possível carregar o total de celulares.");
      } finally {
        setIsLoading(false);
      }
    };

    carregarTotalCelulares();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-cyan-800 mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Visão geral</h2>
          <p className="text-gray-600">
            Acompanhe aqui os principais dados do catálogo de celulares.
          </p>
        </div>

        <div className="flex w-full items-center gap-4 rounded-lg bg-white p-6 shadow">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-800">
            <MdPhoneAndroid size={28} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-600">
              Celulares cadastrados
            </h2>
            {isLoading ? (
              <p className="mt-1 text-sm text-gray-500">Carregando...</p>
            ) : errorMessage ? (
              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            ) : (
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {totalCelulares}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
