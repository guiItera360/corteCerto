import { HTTPClient } from "./ClientConfiguration/client";
import { IAClient } from "./ClientConfiguration/iaClient";

const UsuarioAPI = {
  async obterAsync(usuarioId) {
    try {
      const response = await HTTPClient.get(`Usuario/Obter/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter usuário: ", error);
      throw error;
    }
  },

  async atualizarAsync(usuarioId, nome, email, categoria) {
    try {
      const usuarioAtualizar = {
        nome: nome,
        email: email,
        categoria: Number(categoria),
      };

      const response = await HTTPClient.put(
        `Usuario/Atualizar/${usuarioId}`,
        usuarioAtualizar
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao atualizar usuário: ",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async deletarAsync(usuarioId) {
    try {
      const response = await HTTPClient.delete(`Usuario/Excluir/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao excluir usuário: ",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async criarAsync(nome, email, senha, categoria) {
    try {
      const usuarioCriar = {
        Nome: nome,
        Email: email,
        Senha: senha,
        Categoria: categoria,
      };
      const response = await HTTPClient.post("Usuario/Criar", usuarioCriar);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar usuário: ", error);
      throw error;
    }
  },

  async listarAsync(ativos = true) {
    try {
      const response = await HTTPClient.get(`Usuario/Listar?ativos=${ativos}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter todos os usuários: ", error);
      throw error;
    }
  },

  async listarTiposUsuarioAsync() {
    try {
      const response = await HTTPClient.get("/Usuario/ListarTiposUsuarios");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar tipos de usuários: ", error);
      throw error;
    }
  },

  async alterarSenhaAsync(usuarioId, senhaAntiga, novaSenha) {
    try {
      const requestBody = {
        usuarioId: usuarioId,
        senhaAntiga: senhaAntiga,
        novaSenha: novaSenha,
      };
      const response = await HTTPClient.put(
        "/Usuario/AlterarSenha",
        requestBody
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao alterar senha: ", error);
      throw error;
    }
  },

  async restaurarAsync(usuarioId) {
    try {
      const response = await HTTPClient.put(`/Usuario/Restaurar/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao restaurar usuário: ", error);
      throw error;
    }
  },

  async loginAsync(email, senha) {
    try {
      const response = await HTTPClient.post("/Usuario/login", {
        email: email,
        senha: senha,
      });
      return response.data; // Aqui esperamos que o backend retorne o token
    } catch (error) {
      console.error(
        "Erro ao realizar login: ",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  

  async recomendarCorteAsync(fotoFile, nome) {
    try {
      const formData = new FormData();
      formData.append("file", fotoFile); // <-- Corrigido de "foto" para "file"
      formData.append("nome_cliente", nome);

      const response = await IAClient.post("/recomendar-corte", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Esperamos que venha { corte_recomendado: "..." }
    } catch (error) {
      console.error(
        "Erro ao obter recomendação de corte: ",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default UsuarioAPI;
