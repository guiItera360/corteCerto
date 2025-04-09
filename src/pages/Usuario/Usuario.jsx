import { useState, useEffect } from "react";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import UsuarioApi from "../../services/usuarioAPI";
import style from "./Usuario.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCut } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [mostrarModalResultado, setMostrarModalResultado] = useState(false);
  const [resultadoRecomendacao, setResultadoRecomendacao] = useState(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tiposUsuario, setTiposUsuario] = useState([]);
  const [mostrarModalRecomendar, setMostrarModalRecomendar] = useState(false);
  const [usuarioParaRecomendar, setUsuarioParaRecomendar] = useState(null);

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
      await UsuarioApi.deletarAsync(usuarioSelecionado.usuarioId);
      setMostrarModalExcluir(false);
      await carregaUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const selecionarFotoParaRecomendacao = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      const foto = event.target.files[0];
      if (foto) {
        handleRecomendacao(foto); // Chama a função principal passando o arquivo
      }
    };

    input.click(); // Abre o seletor de arquivo
  };

  const handleRecomendacao = async (foto) => {
    if (!foto || !usuarioParaRecomendar) return;
  
    try {
      const resultado = await UsuarioApi.recomendarCorteAsync(
        foto,
        usuarioParaRecomendar.nome
      );
  
      toast.success(
        `Corte recomendado para ${usuarioParaRecomendar.nome}: ${resultado.corte_recomendado}`
      );
  
      // Novo: salva o resultado para exibir no modal
      setResultadoRecomendacao(resultado);
      setMostrarModalResultado(true);
    } catch (error) {
      toast.error(
        `Erro ao recomendar corte para ${usuarioParaRecomendar.nome}`
      );
    } finally {
      setMostrarModalRecomendar(false);
      setUsuarioParaRecomendar(null);
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
              <th>BarbearIA</th>
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
                      setUsuarioSelecionado(usuario); // <-- objeto inteiro
                      setMostrarModalExcluir(true);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
                <td>
                  <td>
                    <FaCut
                      size={20}
                      className={style.icone_recomendar}
                      title="Recomendar corte"
                      onClick={() => {
                        setUsuarioParaRecomendar(usuario);
                        setMostrarModalRecomendar(true);
                      }}
                    />
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Modal de Recomendação */}
        <Modal
          show={mostrarModalRecomendar}
          onHide={() => setMostrarModalRecomendar(false)}
          className={style.modal_custom}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Recomendar Corte</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Deseja recomendar um corte para{" "}
            <strong>{usuarioParaRecomendar?.nome}</strong>?
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setMostrarModalRecomendar(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={selecionarFotoParaRecomendacao}>
              Escolher Foto
            </Button>
          </Modal.Footer>
        </Modal>
          
        {/* Modal de Recomendação Resposta */}
        <Modal
          show={mostrarModalResultado}
          onHide={() => setMostrarModalResultado(false)}
          className={style.modal_custom}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Cortes recomendados para {resultadoRecomendacao?.cliente}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {resultadoRecomendacao ? (
              <>
                <p>
                  <strong>Formato do rosto:</strong>{" "}
                  {resultadoRecomendacao.formato_rosto || "Não identificado"}
                </p>
                <hr />
                <p>
                  <strong>Tendências atuais:</strong>
                </p>
                <ul>
                  {(resultadoRecomendacao.recomendacoes_corte || []).map((corte, idx) => (
                    <li key={idx}>{corte}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Carregando recomendação...</p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setMostrarModalResultado(false)}
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

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
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </div>
  );
}
