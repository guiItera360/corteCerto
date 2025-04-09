import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Style from "./Calendario.module.css";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AgendamentoAPI from "../../services/AgendamentoAPI";
import UsuarioAPI from "../../services/usuarioAPI";
import ServicoAPI from "../../services/ServicoAPI";
import CustomToolbar from "../Toolbar/CustomToolbar";
import { Form } from "react-bootstrap";
import { toast } from 'react-toastify';

moment.locale("pt-br");
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export function Calendario() {
  const [eventos, setEventos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [modoEdicao, setModoEdicao] = useState(false);
  const [dadosEditados, setDadosEditados] = useState(null);

  useEffect(() => {
    carregarAgendamentos();
    carregarUsuarios();
    carregarServicos();
    carregarCategorias();
  }, []);

  /*Functions que chamam a API*/
    async function carregarAgendamentos() {
      try {
        const dados = await AgendamentoAPI.listarAgendamentosAtivosAsync();
        const eventosFormatados = dados.map((agendamento) => ({
          id: agendamento.agendamentoId,
          title: agendamento.servico.nome,
          start: new Date(agendamento.data),
          end: moment(agendamento.data).add(1, "hour").toDate(),
          cliente: agendamento.usuario.nome,
          status: agendamento.status,
          servicoId: agendamento.servico.servicoId,
          usuarioId: agendamento.usuario.usuarioId,
        }));
        setEventos(eventosFormatados);
      } catch (error) {
        console.error("Erro ao carregar agendamentos: ", error);
      }
    }

    async function carregarUsuarios() {
      try {
        const listaUsuarios = await UsuarioAPI.listarAsync();
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Erro ao carregar usuários: ", error);
      }
    }

    async function carregarServicos() {
      try {
        const listaServicos = await ServicoAPI.listarAsync();
        setServicos(listaServicos);
      } catch (error) {
        console.error("Erro ao carregar serviços: ", error);
      }
    }

    async function carregarCategorias() {
      try {
        const listaCategorias = await AgendamentoAPI.listarCategoriasAsync();
        setCategorias(listaCategorias);
      } catch (error) {
        console.error("Erro ao listar categorias", error);
      }
    }
  /* Fim */

  /*const's para UseState */
    const handleSelecionarEvento = (evento) => {
      setEventoSelecionado(evento);
      setDadosEditados({ ...evento }); // Preenche dados para edição
      setModoEdicao(false); // Começa como visualização apenas
      setMostrarModal(true);
    };

    const handleFecharModal = () => {
      setMostrarModal(false);
      setEventoSelecionado(null);
    };

    const [novoAgendamento, setNovoAgendamento] = useState({
      servicoId: "",
      usuarioId: "",
      data: "",
      status: "",
    });

    const handleChange = (e) => {
      setNovoAgendamento({
        ...novoAgendamento,
        [e.target.name]: e.target.value,
      });
    };

    const handleCriarAgendamento = async () => {
      if (
        !novoAgendamento.servicoId ||
        !novoAgendamento.usuarioId ||
        !novoAgendamento.data ||
        !novoAgendamento.status
      ) {
        toast.error("Preencha todos os campos para criar um agendamento!");
        return;
      }

      try {
        const response = await AgendamentoAPI.criarAsync({
          servicoId: parseInt(novoAgendamento.servicoId),
          usuarioId: parseInt(novoAgendamento.usuarioId),
          data: new Date(novoAgendamento.data).toISOString(),
          status: parseInt(novoAgendamento.status), // Adicionado
        });

        setMostrarModal(false);
        carregarAgendamentos(); // Atualiza a lista de eventos no calendário

        setNovoAgendamento({
          servicoId: "",
          usuarioId: "",
          data: "",
          status: "",
        });
      } catch (error) {
        console.error("Erro ao criar agendamento: ", error);
        toast.error("Data do agendamento não pode ser menor que a atual!")
      }
    };

    const handleEventDrop = async ({ event, start }) => {
      const end = moment(start).add(1, "hour").toDate();

      const agendamentoAtualizado = {
        agendamentoId: event.id,
        servicoId: event.servicoId,
        usuarioId: event.usuarioId,
        data: start.toISOString(),
        status: event.status || 0,
      };

      const eventosAtualizados = eventos.map((ev) =>
        ev.id === event.id ? { ...ev, start, end } : ev
      );
      setEventos(eventosAtualizados);

      try {
        await AgendamentoAPI.atualizarAsync(event.id, agendamentoAtualizado);
        console.log("Agendamento atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar agendamento: ", error);
      }
    };

    const handleEditar = () => {
      setModoEdicao(true);
    };

    const handleCancelarEdicao = () => {
      setModoEdicao(false);
      setDadosEditados({ ...eventoSelecionado }); // Reseta
    };

    const handleChangeEdicao = (e) => {
      setDadosEditados({
        ...dadosEditados,
        [e.target.name]: e.target.value,
      });
    };

    const handleSalvarEdicao = async () => {
      try {
        const dadosAtualizados = {
          agendamentoId: eventoSelecionado.id,
          servicoId: parseInt(dadosEditados.servicoId),
          usuarioId: parseInt(dadosEditados.usuarioId),
          data: new Date(dadosEditados.start).toISOString(),
          status: parseInt(dadosEditados.status),
        };

        await AgendamentoAPI.atualizarAsync(
          eventoSelecionado.id,
          dadosAtualizados
        );
        await carregarAgendamentos();
        setMostrarModal(false);
        toast.success("Agendamento atualizado com sucesso...");
      } catch (error) {
        console.error("Erro ao atualizar agendamento:", error);
        toast.error("Erro ao salvar as alterações.");
      }
    };

    const handleExcluir = async () => {
      const confirm = window.confirm(
        "Tem certeza que deseja excluir este agendamento?"
      );
      if (!confirm) return;

      try {
        await AgendamentoAPI.excluirAsync(eventoSelecionado.id);
        await carregarAgendamentos();
        setMostrarModal(false);
        alert("Agendamento excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        alert("Erro ao excluir o agendamento.");
      }
    };

    const handleNavigate = (action) => {
      if (action === "PREV") {
        setDate(
          moment(date)
            .subtract(
              1,
              view === "month" ? "months" : view === "week" ? "weeks" : "days"
            )
            .toDate()
        );
      } else if (action === "NEXT") {
        setDate(
          moment(date)
            .add(
              1,
              view === "month" ? "months" : view === "week" ? "weeks" : "days"
            )
            .toDate()
        );
      } else if (action === "TODAY") {
        setDate(new Date());
      }
    };

    const handleViewChange = (newView) => {
      setView(newView);
    };
  /*Fim*/

  return (
    <div className={Style.calendar_body}>
      <div className={Style.toolbar}>
        <p>Adicionar Agenda</p>
        <hr />
        <div className={Style.agendamentoBox}>
          <Form>
            <Form.Group controlId="servico">
              <Form.Label>Serviço</Form.Label>
              <Form.Select
                name="servicoId"
                value={novoAgendamento.servicoId}
                onChange={handleChange}
              >
                <option value="">Selecione um serviço</option>
                {servicos.map((servico) => (
                  <option key={servico.servicoId} value={servico.servicoId}>
                    {servico.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <hr />
            <Form.Group controlId="usuario">
              <Form.Label>Cliente</Form.Label>
              <Form.Select
                name="usuarioId"
                value={novoAgendamento.usuarioId}
                onChange={handleChange}
              >
                <option value="">Selecione um cliente</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.usuarioId} value={usuario.usuarioId}>
                    {usuario.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <hr />
            <Form.Group controlId="data">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="datetime-local"
                name="data"
                value={novoAgendamento.data}
                onChange={handleChange}
              />
            </Form.Group>
            <hr />
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={novoAgendamento.status}
                onChange={handleChange}
              >
                <option value="">Selecione o Status</option>
                {categorias.map((categoria) => (
                  <option key={categoria.statusId} value={categoria.statusId}>
                    {categoria.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <hr />
            <Button
              variant="success"
              className="mt-2"
              onClick={handleCriarAgendamento}
            >
              Criar Agendamento
            </Button>
          </Form>
        </div>
      </div>
      <DragAndDropCalendar
        className={Style.calendario}
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        onSelectEvent={handleSelecionarEvento}
        onEventDrop={handleEventDrop}
        components={{
          toolbar: (props) => (
            <CustomToolbar
              {...props}
              onNavigate={handleNavigate}
              onView={handleViewChange}
              view={view}
            />
          ),
        }}
      />
      {/* Modal de Detalhes do Agendamento */}
      <Modal show={mostrarModal} onHide={handleFecharModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dadosEditados && (
            <Form>
              <Form.Group>
                <Form.Label>Cliente</Form.Label>
                <Form.Select
                  name="usuarioId"
                  value={dadosEditados.usuarioId}
                  onChange={handleChangeEdicao}
                  disabled={!modoEdicao}
                >
                  {usuarios.map((usuario) => (
                    <option key={usuario.usuarioId} value={usuario.usuarioId}>
                      {usuario.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
                <hr />
              <Form.Group>
                <Form.Label>Serviço</Form.Label>
                <Form.Select
                  name="servicoId"
                  value={dadosEditados.servicoId}
                  onChange={handleChangeEdicao}
                  disabled={!modoEdicao}
                >
                  {servicos.map((servico) => (
                    <option key={servico.servicoId} value={servico.servicoId}>
                      {servico.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
                <hr />
              <Form.Group>
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="start"
                  value={moment(dadosEditados.start).format("YYYY-MM-DDTHH:mm")}
                  onChange={handleChangeEdicao}
                  disabled={!modoEdicao}
                />
              </Form.Group>
                <hr />
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={dadosEditados.status}
                  onChange={handleChangeEdicao}
                  disabled={!modoEdicao}
                >
                  {categorias.map((cat) => (
                    <option key={cat.statusId} value={cat.statusId}>
                      {cat.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!modoEdicao ? (
            <>
              <Button variant="danger" onClick={handleExcluir}>
                Excluir
              </Button>
              <Button variant="primary" onClick={handleEditar}>
                Editar
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={handleCancelarEdicao}>
                Cancelar
              </Button>
              <Button variant="success" onClick={handleSalvarEdicao}>
                Salvar
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Calendario;