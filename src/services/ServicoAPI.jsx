import { HTTPClient } from "./ClientConfiguration/client";

const ServicoAPI = {
    async obterAsync(servicoId) {
        try {
            const response = await HTTPClient.get(`Servico/Obter/${servicoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter Serviço: ", error);
            throw error;
        }
    },

    async listarAsync() {
        try {
            const response = await HTTPClient.get("Servico/Listar");
            return response.data;
        } catch (error) {
            console.error("Erro ao listar Serviços: ", error);
            throw error;
        }
    },

    async criarAsync(servico) {
        try {
            const response = await HTTPClient.post("Servico/Criar", servico);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar Serviço: ", error);
            throw error;
        }
    },

    async atualizarAsync(servicoId, servico) {
        try {
            const response = await HTTPClient.put(`Servico/Atualizar/${servicoId}`, servico);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar Serviço: ", error);
            throw error;
        }
    },

    async excluirAsync(servicoId) {
        try {
            await HTTPClient.delete(`Servico/Deletar/${servicoId}`);
        } catch (error) {
            console.error("Erro ao excluir Serviço: ", error);
            throw error;
        }
    },

    async restaurarAsync(servicoId) {
        try {
            const response = await HTTPClient.put(`/Servico/Restaurar/${servicoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao restaurar Serviço: ", error);
            throw error;
        }
    },
};

export default ServicoAPI;