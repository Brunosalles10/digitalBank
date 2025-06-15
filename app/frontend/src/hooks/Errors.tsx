import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  // Se for um erro do Axios
  if (axios.isAxiosError(error)) {
    // Verificar se existe resposta do servidor
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // Tentar extrair mensagem de diferentes formatos de resposta
      let message = data?.message || data?.error || data?.msg;

      // Se a mensagem for um array (como erros de validação)
      if (Array.isArray(message)) {
        message = message.join(", ");
      }

      // Se ainda não temos uma mensagem específica, usar mensagens padrão baseadas no status
      if (!message) {
        switch (status) {
          case 400:
            message = "Dados inválidos. Verifique as informações enviadas.";
            break;
          case 401:
            message = "Credenciais inválidas. Verifique seu email e senha.";
            break;
          case 403:
            message = "Acesso negado. Você não tem permissão para esta ação.";
            break;
          case 404:
            message = "Recurso não encontrado.";
            break;
          case 409:
            message = "Conflito de dados. Este registro já existe.";
            break;
          case 422:
            message = "Dados inválidos. Verifique os campos preenchidos.";
            break;
          case 429:
            message = "Muitas tentativas. Tente novamente em alguns minutos.";
            break;
          case 500:
            message = "Erro interno do servidor. Tente novamente mais tarde.";
            break;
          case 502:
            message = "Servidor indisponível. Tente novamente mais tarde.";
            break;
          case 503:
            message = "Serviço temporariamente indisponível.";
            break;
          default:
            message = `Erro do servidor (${status})`;
        }
      }

      return message;
    }

    // Se não há resposta (erro de rede)
    if (error.request) {
      // Verificar diferentes tipos de erro de rede
      if (error.code === "NETWORK_ERROR" || error.code === "ERR_NETWORK") {
        return "Erro de conexão. Verifique sua internet e tente novamente.";
      }

      if (error.code === "ECONNREFUSED") {
        return "Não foi possível conectar ao servidor. Tente novamente mais tarde.";
      }

      if (error.code === "TIMEOUT" || error.code === "ECONNABORTED") {
        return "Tempo limite excedido. Tente novamente.";
      }

      return "Erro de conexão. Verifique sua internet e tente novamente.";
    }

    // Outros erros do Axios
    return error.message || "Erro na requisição.";
  }

  // Se for um erro padrão do JavaScript
  if (error instanceof Error) {
    return error.message;
  }

  // Se for uma string
  if (typeof error === "string") {
    return error;
  }

  // Fallback para erros desconhecidos
  return "Ocorreu um erro inesperado. Tente novamente.";
};

// Função auxiliar para extrair mensagens de erro específicas de validação
export const getValidationErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data;

    // Se existe um campo 'errors' com detalhes de validação
    if (data.errors && typeof data.errors === "object") {
      const errorMessages = Object.values(data.errors).flat();
      return errorMessages.join(", ");
    }
  }

  return getErrorMessage(error);
};

// Função para verificar se é um erro de autenticação
export const isAuthError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 401 || error.response?.status === 403;
  }
  return false;
};

// Função para verificar se é um erro de validação
export const isValidationError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 400 || error.response?.status === 422;
  }
  return false;
};
