// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import UsuarioApi from "../../../services/usuarioAPI";
// import style from "./EditarUsuario.module.css";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// export function EditarUsuario() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [nome, setNome] = useState("");
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");
//   const [categoria, setCategoria] = useState("");
//   const [tiposUsuario, setTiposUsuario] = useState([]);

//   useEffect(() => {
//     async function carregarDados() {
//       try {
//         const usuario = await UsuarioApi.obterPorIdAsync(id);
//         setNome(usuario.nome);
//         setEmail(usuario.email);
//         setCategoria(usuario.categoria);
//         const tipos = await UsuarioApi.listarTiposUsuarioAsync();
//         setTiposUsuario(tipos);
//       } catch (error) {
//         console.error("Erro ao carregar usuário:", error);
//       }
//     }

//     carregarDados();
//   }, [id]);

//   async function handleSalvar() {
//     try {
//       await UsuarioApi.atualizarAsync(id, { nome, email, senha, categoria });
//       navigate("/usuarios");
//     } catch (error) {
//       console.error("Erro ao atualizar usuário:", error);
//     }
//   }

//   return (
//     <div className={style.container}>
//       <h2>Editar Usuário</h2>
//       <Form>
//         <Form.Group className={style.formGroup}>
//           <Form.Label>Nome</Form.Label>
//           <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
//         </Form.Group>

//         <Form.Group className={style.formGroup}>
//           <Form.Label>E-mail</Form.Label>
//           <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </Form.Group>

//         <Form.Group className={style.formGroup}>
//           <Form.Label>Senha (deixe em branco para não alterar)</Form.Label>
//           <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
//         </Form.Group>

//         <Form.Group className={style.formGroup}>
//           <Form.Label>Categoria</Form.Label>
//           <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
//             <option>Selecione uma Categoria</option>
//             {tiposUsuario.map((tipo) => (
//               <option key={tipo.id} value={tipo.id}>
//                 {tipo.nome}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>

//         <div className={style.buttonGroup}>
//           <Button variant="secondary" onClick={() => navigate("/usuarios")}>
//             Cancelar
//           </Button>
//           <Button variant="primary" onClick={handleSalvar}>
//             Salvar
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }
