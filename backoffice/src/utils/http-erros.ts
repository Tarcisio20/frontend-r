export function getHttpErrorMessage(statusCode: number): string {
  const messages: Record<number, string> = {
    300: "Múltiplas opções disponíveis para esta requisição.",
    400: "Requisição inválida. Verifique os dados enviados.",
    401: "Você não está autenticado. Faça login para continuar.",
    403: "Acesso negado. Você não tem permissão para essa ação.",
    404: "Recurso não encontrado.",
    405: "Método não permitido para essa rota.",
    408: "Tempo de requisição esgotado. Tente novamente.",
    409: "Conflito nos dados enviados.",
    422: "Dados inválidos. Verifique os campos do formulário.",
    429: "Muitas requisições. Por favor, aguarde um momento.",
    500: "Erro interno do servidor. Tente novamente mais tarde.",
    501: "Funcionalidade não implementada no servidor.",
    502: "Erro na comunicação com o servidor.",
    503: "Servidor temporariamente indisponível.",
    504: "Tempo limite do servidor excedido.",
  };

  return messages[statusCode] || "Ocorreu um erro inesperado. Tente novamente.";
}
