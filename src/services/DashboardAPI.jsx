import { HTTPClient } from "./ClientConfiguration/client";

const DashboardAPI = {
  async resumoAtendimentoAsync(dataInicio, dataFim) {
    try {
      const rangeDatas = {
        dataInicio: dataInicio,
        dataFim: dataFim,
      };

      const response = await HTTPClient.post(
        "Agendamento/ResumoAtendimentos",
        rangeDatas
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados...", error);
      throw error;
    }
  },

  async resumoFaturamentoAsync(dataInicio, dataFim) {
    try {
      const rangeDatas = {
        dataInicio: dataInicio,
        dataFim: dataFim,
      };

      const response = await HTTPClient.post(
        "Agendamento/ResumoFaturamento",
        rangeDatas
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados...", error);
      throw error;
    }
  },

  // Agendamentos do dia
  async listarAgendamentosDiaAsync() {
    try {
      const response = await HTTPClient.get("Agendamento/AgendamentosDia");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar Agendamentos do Dia:", error);
      throw error;
    }
  },

  // Performance semanal (últimos 7 dias)
  async listarPerformanceSemanalAsync() {
    try {
      const response = await HTTPClient.get("Agendamento/PerformanceSemanal");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar Performance Semanal:", error);
      throw error;
    }
  },
};

export default DashboardAPI;
