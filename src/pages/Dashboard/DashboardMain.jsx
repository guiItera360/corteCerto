// import style from "./DashboardMain.module.css";
// import { CardInfo } from "../../components/CardInfo/CardInfo";
// import { FiBarChart } from "react-icons/fi";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import { useState } from "react";

// export function DashboardMain() {
//   const [services, setServices] = useState([
//     { id: 1, name: "João Silva", service: "Corte + Barba", time: "14:30" },
//     { id: 2, name: "Carlos Oliveira", service: "Corte Degradê", time: "16:00" },
//     { id: 3, name: "Pedro Santos", service: "Barba Completa", time: "10:15" },
//   ]);

//   return (
//     <div className={style.dashboardContainer}>
//       <h2>Olá <b>ADMINISTRADOR</b></h2>
//       <p>"Se existe uma forma de fazer melhor, descubra-a." (Thomas Edison)</p>
      
//       <div className={style.cardsContainer}>
//         <CardInfo
//           title="Capacidade"
//           infoIcon={<AiOutlineInfoCircle />}
//           description="Carga horária: 08h 00m Tempo alocado: 01h 07m"
//           percentage={13}
//           color="blue"
//         />
//         <CardInfo
//           title="Nível de atendimento"
//           infoIcon={<AiOutlineInfoCircle />}
//           description="0- Impedimentos, 0- Planejados, 3- Atrasados"
//           percentage={100}
//           color="red"
//         />
//         <CardInfo
//           title="Performance da semana"
//           infoIcon={<AiOutlineInfoCircle />}
//           description="Serviços Concluídos Na última semana"
//           percentage={60}
//           color="gray"
//         />
//       </div>
//     </div>
//   );
// }
