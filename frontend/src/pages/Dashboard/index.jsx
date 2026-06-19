import React from "react";


const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl font-bold text-cyan-800 mb-6">Dashboard</h1>
      <div className="flex  items-center justify-between gap-6">
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Visão geral</h2>
          <p className="text-gray-600">
            Acompanhe aqui os principais dados do catálogo de celulares.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
