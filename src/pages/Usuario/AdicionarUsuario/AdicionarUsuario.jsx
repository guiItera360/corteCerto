// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import UsuarioAPI from "../../../services/usuarioAPI"; 
// import { Sidebar } from "../../../components/Sidebar/Sidebar";
// import style from "./AdicionarUsuario.module.css";

// export function AdicionarUsuario() {
//   const [nome, setNome] = useState("");
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");
//   const [categoria, setCategoria] = useState("");
//   const [tiposUsuario, setTiposUsuario] = useState([]);
//   const navigate = useNavigate();

//   async function carregarTipos() {
//     try {
//       const listaTipos = await UsuarioAPI.listarTiposUsuarioAsync();
//       setTiposUsuario(listaTipos);
//     } catch (error) {
//       console.error("Erro ao carregar tipos de usuários:", error);
//     }
//   }

//   useEffect(() => {
//     carregarTipos();
//   }, []);

//   const handleCriarUsuario = async () => {
//     try {
//       await UsuarioAPI.criarAsync(nome, email, senha, parseInt(categoria));
//       navigate("/usuarios");
//     } catch (error) {
//       console.error("Erro ao criar usuário:", error);
//     }
//   };

//   return (
//     <div className={style.layout}>
//       <Sidebar />
//       <div className={style.mainContent}>
//         <h3>Criar Novo Usuário</h3>
//         <Form>
//           <Form.Group>
//             <Form.Label>Nome</Form.Label>
//             <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Senha</Form.Label>
//             <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Categoria</Form.Label>
//             <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
//               <option value="">Selecione...</option>
//               {tiposUsuario.map((tipo) => (
//                 <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//           <Button variant="primary" onClick={handleCriarUsuario}>Criar</Button>
//         </Form>
//       </div>
//     </div>
//   );
// }
