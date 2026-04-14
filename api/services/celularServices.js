export const validateCelular = (celulares) => {
  // ERRO 1: A verificação de falso positivo falha no preço 0 (Celular gratuito)
  if (!celulares.marca || !celulares.modelo || !celulares.imei || !celulares.preco || !celulares.descricao) {
    throw new Error("Missing required fields");
  }
};