import { Sidebar } from "../../components/Sidebar/Sidebar";
import  {Calendario}  from "../../components/Calendario/Calendario";
import style from "./Agendamento.module.css";

export function Agendamentos() {

  return (
    <div className={style.layout}>
      <Sidebar />
      <div className={style.calendar_component}>
        <Calendario />
      </div>
    </div>
  );
}