import { useState, useEffect } from "react";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import UsuarioApi from "../../services/usuarioAPI";
import style from "./Usuario.module.css";
import { MdDelete, MdEdit } from "react-icons/md";

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tiposUsuario, setTiposUsuario] = useState([]);

  useEffect(() => {
    carregarTipos();
    carregaUsuarios();
  }, []);

  async function carregarTipos() {
    try {
      const listaTipos = await UsuarioApi.listarTiposUsuarioAsync();
      setTiposUsuario(listaTipos);
    } catch (error) {
      console.error("Erro ao carregar tipos de usuários: ", error);
    }
  }

  async function carregaUsuarios() {
    try {
      const listaUsuarios = await UsuarioApi.listarAsync(true);
      setUsuarios(listaUsuarios);
    } catch (error) {
      console.error("Erro ao carregar usuários: ", error);
    }
  }

  const handleCriarUsuario = async () => {
    try {
      await UsuarioApi.criarAsync(nome, email, senha, parseInt(categoria));
      setMostrarModalCriar(false);
      setNome("");
      setEmail("");
      setSenha("");
      setCategoria("");
      await carregaUsuarios();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const handleEditarUsuario = async () => {
    if (!usuarioSelecionado || !usuarioSelecionado.usuarioId) {
      console.error("Erro: ID do usuário não encontrado.");
      return;
    }

    const usuarioEditado = {
      nome,
      email,
      categoria: parseInt(categoria),
    };

    try {
      await UsuarioApi.atualizarAsync(
        usuarioSelecionado.usuarioId,
        usuarioEditado.nome,
        usuarioEditado.email,
        usuarioEditado.categoria
      );
      

      setMostrarModalEditar(false);
      setNome("");
      setEmail("");
      setCategoria(parseInt(usuarioEditado.categoria));
      await carregaUsuarios();
    } catch (error) {
      console.error("Erro ao editar usuário:", error.response?.data || error);
    }
  };

  const handleExcluirUsuario = async () => {
    try {
      await UsuarioApi.deletarAsync(usuarioSelecionado);
      setMostrarModalExcluir(false);
      await carregaUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <div className={style.layout}>
      <Sidebar />
      <div className={style.mainContent}>
        <div className={style.pagina_cabecalho}>
          <h3 className={style.title}>Usuários</h3>
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
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.usuarioId}>
                <td>{usuario.nome}</td>
                <td>
                  {tiposUsuario.find((tipo) => tipo.id === usuario.categoria)
                    ?.nome || "Desconhecido"}
                </td>
                <td>
                  <button
                    className={style.botao_editar}
                    onClick={() => {
                      setUsuarioSelecionado(usuario);
                      setNome(usuario.nome || "");
                      setEmail(usuario.email || "");
                      setCategoria(usuario.categoria?.toString() || "");
                      setMostrarModalEditar(true);
                    }}
                  >
                    <MdEdit />
                  </button>

                  <button
                    className={style.botao_deletar}
                    onClick={() => {
                      setUsuarioSelecionado(usuario.usuarioId);
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
            <Modal.Title>Criar Novo Usuário</Modal.Title>
          </Modal.Header>

          <Modal.Body className={style.modal_body_custom}>
            <Form>
              <Form.Group className={style.modal_field}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="Digite o nome do Usuário..."
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>

              <hr />

              <Form.Group className={style.modal_itens}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  placeholder="Digite o e-mail..."
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <hr />

              <Form.Group className={style.modal_itens}>
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  placeholder="Digite a senha..."
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </Form.Group>

              <hr />

              <Form.Group className={style.modal_itens}>
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Selecione uma Categoria</option>
                  {tiposUsuario.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))}
                </Form.Select>
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
              onClick={handleCriarUsuario}
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
            <Modal.Title>Editar Usuário</Modal.Title>
          </Modal.Header>

          <Modal.Body className={style.modal_body_custom}>
            <Form>
              <Form.Group className={style.modal_field}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="Digite o nome do Usuário..."
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>
              <hr />
              <Form.Group className={style.modal_itens}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  placeholder="Digite o e-mail..."
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <hr />
              <Form.Group className={style.modal_itens}>
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Selecione uma Categoria</option>
                  {tiposUsuario.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <hr />
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className={style.modal_button_cancelar}
              onClick={() => setMostrarModalEditar(false)}
            >
              Cancelar
            </Button>
            <Button
              className={style.modal_button_salvar}
              onClick={handleEditarUsuario}
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
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Tem certeza de que deseja excluir este usuário?
          </Modal.Body>

          <Modal.Footer>
            <Button
              className={style.modal_button_cancelar}
              onClick={() => setMostrarModalExcluir(false)}
            >
              Cancelar
            </Button>

            <Button
              className={style.button_excluir}
              onClick={handleExcluirUsuario}
            >
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
