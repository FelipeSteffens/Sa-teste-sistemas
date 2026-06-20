import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import CardCelular from "../../components/CardCelular";
import Modal from "../../components/Modal";
import FormularioCelular from "../../components/FormularioCelular";

const Celulares = () => {
  const [celulares, setCelulares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [celularSelecionado, setCelularSelecionado] = useState(null);

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

  const abrirCadastro = () => {
    setCelularSelecionado(null);
    setIsModalOpen(true);
  };

  const abrirEdicao = (celular) => {
    setCelularSelecionado(celular);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setCelularSelecionado(null);
  };

  const handleSalvarCelular = (celularSalvo) => {
    setCelulares((celularesAtuais) => {
      if (!celularSelecionado) {
        return [celularSalvo, ...celularesAtuais];
      }

      return celularesAtuais.map((celular) =>
        celular.id === celularSalvo.id ? celularSalvo : celular
      );
    });
    fecharModal();
  };

  const handleExcluirCelular = async (celular) => {
    const confirmouExclusao = window.confirm(
      `Deseja excluir o celular ${celular.marca} ${celular.modelo}?`
    );

    if (!confirmouExclusao) {
      return;
    }

    try {
      await api.delete(`/cellphones/deletar/${celular.id}`);
      setCelulares((celularesAtuais) =>
        celularesAtuais.filter((item) => item.id !== celular.id)
      );
      toast.success("Celular excluído com sucesso!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Erro ao excluir celular", error);
      toast.error("Erro ao excluir celular.", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-cyan-800">Celulares</h1>
        <button
          onClick={abrirCadastro}
          className="px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors"
        >
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
              <CardCelular
                key={celular.id}
                celular={celular}
                onEditar={abrirEdicao}
                onExcluir={handleExcluirCelular}
              />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={fecharModal}>
        <FormularioCelular
          celular={celularSelecionado}
          onSalvar={handleSalvarCelular}
        />
      </Modal>
    </div>
  );
};

export default Celulares;
