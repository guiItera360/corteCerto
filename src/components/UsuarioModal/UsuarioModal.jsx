// UsuarioModal.jsx
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "./UsuarioModal.module.css";

export default function UsuarioModal({ show, handleClose, handleSave, nome, setNome, email, setEmail, senha, setSenha, categoria, setCategoria, tiposUsuario = []}) {
  return (
    <Modal show={show} onHide={handleClose} className={style.modal_custom} centered>
      <Modal.Header closeButton>
        <Modal.Title>Criar Novo Usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body className={style.modal_body_custom}>
        <Form>
          <Form.Group className={style.modal_field}>
            <Form.Label>Nome</Form.Label>
            <Form.Control placeholder="Digite o nome do Usuário..." type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </Form.Group>
          <hr />

          <Form.Group className={style.modal_itens}>
            <Form.Label>E-mail</Form.Label>
            <Form.Control placeholder="Digite o e-mail..." type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <hr />

          <Form.Group className={style.modal_itens}>
            <Form.Label>Senha</Form.Label>
            <Form.Control placeholder="Digite a senha..." type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </Form.Group>
          <hr />

          <Form.Group className={style.modal_itens}>
            <Form.Label>Categoria</Form.Label>
            <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Selecione uma Categoria</option>
              {tiposUsuario.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <hr />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button className={style.modal_button_cancelar} onClick={handleClose}>Cancelar</Button>
        <Button className={style.modal_button_salvar} onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}