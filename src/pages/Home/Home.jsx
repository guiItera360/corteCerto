import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import DashboardAPI from "../../services/DashboardAPI";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Badge,
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronRight } from "lucide-react";
import { set } from "date-fns";

export function Home() {
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(primeiroDia.toISOString().substring(0, 10));
  const [endDate, setEndDate] = useState(hoje.toISOString().substring(0, 10));
  const [resumoAtendimento, setResumoAtendimento] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      resumoAgendamentos();
    }
  }, [startDate, endDate]);

  // Dados para os gráficos
  const dailyAppointments = {
    total: 15,
    confirmed: 1,
    percentage: 25,
  };

  async function resumoAgendamentos() {
    try {
      const agendamentosinRange = await DashboardAPI.resumoAtendimentoAsync(
        startDate,
        endDate
      );
      setResumoAtendimento(agendamentosinRange);
    } catch (error) {
      console.error("Erro ao carregar resumo: ", error);
    }
  }

  const weeklyPerformance = [
    { day: "Seg", appointments: 6 },
    { day: "Ter", appointments: 22 },
    { day: "Qua", appointments: 5 },
    { day: "Qui", appointments: 9 },
    { day: "Sex", appointments: 7 },
    { day: "Sáb", appointments: 10 },
    { day: "Dom", appointments: 4 },
  ];

  const appointments = [
    {
      id: 1,
      client: "João Silva",
      service: "Corte + Barba",
      time: "14:30",
      status: "Hoje",
    },
    {
      id: 2,
      client: "Carlos Oliveira",
      service: "Corte Degradê",
      time: "16:00",
      status: "Hoje",
    },
    {
      id: 3,
      client: "Pedro Santos",
      service: "Barba Completa",
      time: "10:15",
      status: "Amanhã",
    },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="bg-dark text-light min-vh-100 py-4">
      <Sidebar />
      <Topbar />
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="mb-1">Olá ADMINISTRADOR</h4>
            <p className="text-muted mb-0">
              "Se existe uma forma de fazer melhor, descubra-a." (Thomas Edison)
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-start align-items-center mb-4 gap-3">
          <div>
            <label className="form-label mb-1">Data Inicial</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Início"
              className="form-control"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div>
            <label className="form-label mb-1">Data Final</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Fim"
              className="form-control"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card bg="dark" text="light" className="h-100 border-secondary">
              <Card.Body>
                <h6 className="mb-3">Atendimentos</h6>
                <div className="text-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Agendamentos Marcados",
                            value: resumoAtendimento,
                          },
                          {
                            name: "Realizado",
                            value: 100 - dailyAppointments.percentage,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-3">
                    <p className="mb-1">Agendamentos Marcados: 16</p>
                    <p className="mb-0">Realizado: 5</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card bg="dark" text="light" className="h-100 border-secondary">
              <Card.Body>
                <h6 className="mb-3">Faturamento</h6>
                <div className="text-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Previsto",
                            value: dailyAppointments.confirmed,
                          },
                          {
                            name: "Alcançado",
                            value:
                              dailyAppointments.total -
                              dailyAppointments.confirmed,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-3">
                    <p className="mb-1">Previsto: R$ 1.650,00</p>
                    <p className="mb-1">Alcançado: R$ 900,00</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card bg="dark" text="light" className="h-100 border-secondary">
              <Card.Body>
                <h6 className="mb-3">Performance da semana</h6>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyPerformance}>
                    <XAxis dataKey="day" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="text-center mt-3">
                  <p className="mb-1">Agendamentos Concluídos</p>
                  <p className="mb-0">Nos últimos 7 dias</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* <Row className="mb-4">
          <Col>
            <div className="d-flex gap-4">
              <Card bg="dark" text="light" className="flex-grow-1 border-secondary">
                <Card.Body className="d-flex align-items-center">
                  <Calendar className="text-primary me-3" size={24} />
                  <div>
                    <small className>7 Agendamento para hoje</small>
                  </div>
                </Card.Body>
              </Card>

              <Card bg="dark" text="light" className="flex-grow-1 border-secondary">
                <Card.Body className="d-flex align-items-center">
                  <Users className="text-success me-3" size={24} />
                  <div>
                    <small className>3 Clientes confirmados </small>
                  </div>
                </Card.Body>
              </Card>

              <Card bg="dark" text="light" className="flex-grow-1 border-secondary">
                <Card.Body className="d-flex align-items-center">
                  <Clock className="text-danger me-3" size={24} />
                  <div>
                    <small>Proximo Cliente: Guilherme</small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row> */}

        <Card bg="dark" text="light" className="border-secondary">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="mb-0">Lista de Agendamentos</h6>
              <Button
                variant="link"
                className="text-primary p-0"
                onClick={() => setShowModal(true)}
              >
                Ver mais <ChevronRight size={16} />
              </Button>
            </div>

            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary"
              >
                <div>
                  <h6 className="mb-1">{appointment.client}</h6>
                  <small>
                    {appointment.service} • {appointment.time}
                  </small>
                </div>
                <Badge
                  bg={appointment.status === "Hoje" ? "primary" : "secondary"}
                >
                  {appointment.status}
                </Badge>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
          className="text-light"
        >
          <Modal.Header closeButton className="bg-dark border-secondary">
            <Modal.Title>Todos os Agendamentos</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary"
              >
                <div>
                  <h6 className="mb-1">{appointment.client}</h6>
                  <small className="text-muted">
                    {appointment.service} • {appointment.time}
                  </small>
                </div>
                <Badge
                  bg={appointment.status === "Hoje" ? "primary" : "secondary"}
                >
                  {appointment.status}
                </Badge>
              </div>
            ))}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
