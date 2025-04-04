import { HTTPClient } from "./ClientConfiguration/client";

const AgendamentoAPI = {
    async obterAsync(agendamentoId) {
        try {
            const response = await HTTPClient.get(`Agendamento/Obter/${agendamentoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter Agendamento: ", error);
            throw error;
        }
    },

    async criarAsync(agendamentoData) {
        try {
            const response = await HTTPClient.post("Agendamento/Criar", agendamentoData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar Agendamento: ", error);
            throw error;
        }
    },

    async cancelarAsync(agendamentoId) {
        try {
            const response = await HTTPClient.put(`Agendamento/CancelarAgendamento/${agendamentoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao cancelar Agendamento: ", error);
            throw error;
        }
    },

    async confirmarAsync(agendamentoId) {
        try {
            const response = await HTTPClient.put(`Agendamento/ConfirmarAgendamento/${agendamentoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao confirmar Agendamento: ", error);
            throw error;
        }
    },

    async listarAgendamentosAtivosAsync() {
        try {
            const response = await HTTPClient.get("Agendamento/ListarAgendamentosAtivos");
            return response.data;
        } catch (error) {
            console.error("Erro ao listar Agendamentos Ativos: ", error);
            throw error;
        }
    },

    async atualizarAsync(agendamentoId, agendamento) {
        try {
            const response = await HTTPClient.put(
                `Agendamento/Atualizar/${agendamentoId}`,
                agendamento
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar Agendamento: ", error);
            throw error;
        }
    },

    async listarCategoriasAsync() {
        try {
            const response = await HTTPClient.get("/Agendamento/ListarStatusAgendamento");
            return response.data;
        } catch (error) {
            console.error("Erro ao listar Categorias: ", error);
            throw error;
        }
    }
    
};

export default AgendamentoAPI;
