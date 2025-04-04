// import { useState, useEffect } from "react";
// import {Calendar} from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { Sidebar } from "../../components/Sidebar/Sidebar";
// import AgendamentoAPI from "../../services/AgendamentoAPI";
// import style from "./Agendamento.module.css";
// import { MdDelete, MdCheckCircle } from "react-icons/md";

// export function Agendamentos() {
//   const [agendamentos, setAgendamentos] = useState([]);
//   const [dataSelecionada, setDataSelecionada] = useState(new Date());
//   const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
//   const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
//   const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

//   useEffect(() => {
//     carregarAgendamentos();
//   }, []);

//   async function carregarAgendamentos() {
//     try {
//       const listaAgendamentos = await AgendamentoAPI.listarAsync();
//       setAgendamentos(listaAgendamentos);
//     } catch (error) {
//       console.error("Erro ao carregar agendamentos: ", error);
//     }
//   }

//   const handleCriarAgendamento = async () => {
//     try {
//       await AgendamentoAPI.criarAsync(dataSelecionada);
//       setMostrarModalCriar(false);
//       await carregarAgendamentos();
//     } catch (error) {
//       console.error("Erro ao criar agendamento: ", error);
//     }
//   };

//   const handleConfirmarAgendamento = async (id) => {
//     try {
//       await AgendamentoAPI.confirmarAsync(id);
//       await carregarAgendamentos();
//     } catch (error) {
//       console.error("Erro ao confirmar agendamento: ", error);
//     }
//   };

//   const handleCancelarAgendamento = async () => {
//     try {
//       await AgendamentoAPI.cancelarAsync(agendamentoSelecionado);
//       setMostrarModalExcluir(false);
//       await carregarAgendamentos();
//     } catch (error) {
//       console.error("Erro ao cancelar agendamento: ", error);
//     }
//   };

//   return (
//     <div className={style.layout}>
//       <Sidebar />
//       <div className={style.mainContent}>
//         <div className={style.pagina_cabecalho}>
//           <h3 className={style.title}>Agendamentos</h3>
//           <Button className={style.botao_novo} onClick={() => setMostrarModalCriar(true)}>
//             + Novo
//           </Button>
//         </div>

//         <Calendar 
//           onChange={setDataSelecionada} 
//           value={dataSelecionada} 
//           className={style.calendario}
//         />

//         {/* Modal de Criação */}
//         <Modal show={mostrarModalCriar} onHide={() => setMostrarModalCriar(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Criar Novo Agendamento</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <p>Escolha uma data para o novo agendamento:</p>
//             <Calendar 
//               onChange={setDataSelecionada} 
//               value={dataSelecionada} 
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={() => setMostrarModalCriar(false)}>Cancelar</Button>
//             <Button onClick={handleCriarAgendamento}>Criar</Button>
//           </Modal.Footer>
//         </Modal>

//         {/* Modal de Exclusão */}
//         <Modal show={mostrarModalExcluir} onHide={() => setMostrarModalExcluir(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Cancelar Agendamento</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             Tem certeza de que deseja cancelar este agendamento?
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={() => setMostrarModalExcluir(false)}>Cancelar</Button>
//             <Button onClick={handleCancelarAgendamento}>Confirmar</Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// }