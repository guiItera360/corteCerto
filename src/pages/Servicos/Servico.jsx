import { useState, useEffect } from "react";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import ServicoAPI from "../../services/ServicoAPI";
import style from "./Servico.module.css";
import { MdDelete, MdEdit } from "react-icons/md";

export function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos() {
    try {
      const listaServicos = await ServicoAPI.listarAsync();
      setServicos(listaServicos);
    } catch (error) {
      console.error("Erro ao carregar serviços: ", error);
    }
  }

  const handleCriarServico = async () => {
    try {
      await ServicoAPI.criarAsync({
        nome,
        descricao,
        preco: parseFloat(preco),
      });
      setMostrarModalCriar(false);
      setNome("");
      setDescricao("");
      setPreco("");
      await carregarServicos();
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
    }
  };

  const handleEditarServico = async () => {
    if (!servicoSelecionado) return;

    try {
      await ServicoAPI.atualizarAsync(servicoSelecionado.id, {
        nome,
        descricao,
        preco: parseFloat(preco),
      });
      setMostrarModalEditar(false);
      setNome("");
      setDescricao("");
      setPreco("");
      await carregarServicos();
    } catch (error) {
      console.error("Erro ao editar serviço:", error);
    }
  };

  const handleExcluirServico = async () => {
    try {
      await ServicoAPI.excluirAsync(servicoSelecionado);
      setMostrarModalExcluir(false);
      await carregarServicos();
    } catch (error) {
      console.error("Erro ao excluir serviço:", error);
    }
  };

  return (
    <div className={style.layout}>
      <Sidebar />
      <div className={style.mainContent}>
        <div className={style.pagina_cabecalho}>
          <h3 className={style.title}>Serviços</h3>
          <Button
            className={style.botao_novo}
            onClick={() => setMostrarModalCriar(true)}
          >
            + Novo
          </Button>
        </div>

        <Table responsive className={style.tabela}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((servico) => (
              <tr key={servico.id}>
                <td>{servico.nome}</td>
                <td>{servico.observacao}</td>
                <td>R$ {servico.preco.toFixed(2)}</td>
                <td>
                  <button
                    className={style.botao_editar}
                    onClick={() => {
                      setServicoSelecionado(servico);
                      setNome(servico.nome);
                      setDescricao(servico.observacao);
                      setPreco(servico.preco.toString());
                      setMostrarModalEditar(true);
                    }}
                  >
                    <MdEdit />
                  </button>

                  <button
                    className={style.botao_deletar}
                    onClick={() => {
                      setServicoSelecionado(servico.servicoId);
                      setMostrarModalExcluir(true);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal de Criação */}
        <Modal
          show={mostrarModalCriar}
          onHide={() => setMostrarModalCriar(false)}
          className={style.modal_custom}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Criar Novo Serviço</Modal.Title>
          </Modal.Header>

          <Modal.Body className={style.modal_body_custom}>
            <Form>
              <Form.Group className={style.modal_field}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="Digite o nome do Serviço..."
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>
              <hr />
              <Form.Group className={style.modal_itens}>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  placeholder="Digite a descrição do Serviço..."
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>
              <hr />
              <Form.Group className={style.modal_itens}>
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  placeholder="Digite o preço do Serviço..."
                  min="0.01"
                  max="1000.00"
                  type="number"
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </Form.Group>
              <hr />
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className={style.modal_button_cancelar}
              onClick={() => setMostrarModalCriar(false)}
            >
              Cancelar
            </Button>
            <Button
              className={style.modal_button_salvar}
              onClick={handleCriarServico}
            >
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de Edição */}
        <Modal
          show={mostrarModalEditar}
          onHide={() => setMostrarModalEditar(false)}
          className={style.modal_custom}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Serviço</Modal.Title>
          </Modal.Header>

          <Modal.Body className={style.modal_body_custom}>
            <Form>
              <Form.Group className={style.modal_field}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="Digite o novo nome do Serviço..."
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>
              <hr />
              <Form.Group className={style.modal_itens}>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  placeholder="Digite a nova descrição do Serviço..."
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>
              <hr />
              <Form.Group className={style.modal_itens}>
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  placeholder="Digite o novo preço do Serviço..."
                  min="0.01"
                  max="1000.00"
                  type="number"
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </Form.Group>
              <hr />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
                className={style.modal_button_cancelar} 
                onClick={() => setMostrarModalEditar(false)}>
              Cancelar
            </Button>
            <Button
              className={style.modal_button_salvar}
              onClick={handleEditarServico}
            >
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de Exclusão */}
        <Modal
          show={mostrarModalExcluir}
          onHide={() => setMostrarModalExcluir(false)}
          className={style.modal_custom}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Excluir Serviço</Modal.Title>
          </Modal.Header>

          <Modal.Body className={style.modal_body_custom}>
            Tem certeza de que deseja excluir este serviço?
          </Modal.Body>

          <Modal.Footer>
            <Button
                className={style.modal_button_cancelar} 
                onClick={() => setMostrarModalExcluir(false)}>
              Cancelar
            </Button>

            <Button
              className={style.modal_button_salvar}  
              onClick={handleExcluirServico}
            >
              Confirmar
            </Button>
          </Modal.Footer>
     
        </Modal>
      </div>
    </div>
  );
}
