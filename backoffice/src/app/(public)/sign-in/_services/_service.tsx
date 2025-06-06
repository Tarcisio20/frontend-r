import axios, { AxiosError } from 'axios'
import type {loginType} from '../../../../../../types/loginType'    


interface LoginResponse {
  success: boolean;
  token?: string; // 'token' é opcional pois pode não existir em um erro
  message: string;
  data?: any; // Dados adicionais que podem ser retornados
  status?: number
}

export const login = async (data: loginType): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/token/`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    
    return {
      status : response.status,
      success: true,
      data: response.data,
      message: "Login bem-sucedido",
    };
  } catch (err) {

    const error = err as AxiosError;

    if (error.response) {
      // Erro retornado pela API (status 400, 500, etc.)
      const { message } = (error.response.data as any)?.message ||
        (error.response.data as any)?.detail ||
        "Erro inesperado da API";
      const status = error.response.status;
      return {
        status,
        success: false,
        message,
      };
    } else if (error.request) {
      // Erro de conexão (não houve resposta do servidor)
      return {
        success: false,
        status: 0,
        message: "Erro de conexão: sem resposta do servidor",
      };
    } else {
      // Erro genérico (erro ao configurar a requisição)
      return {
        status: 0,
        success: false,
        message: error.message,
      };
    }
  }
};