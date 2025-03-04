import style from "./Sidebar.module.css";
import { SidebarItem } from "../SidebarItem/SidebarItem";

export function Sidebar({ children }) {
  return (
    <div>
      <div className={style.sidebar_conteudo}>

        <div className={style.sidebar_corpo}>
            <SidebarItem texto="Usuários" link="/usuarios"/>
            <SidebarItem texto="Projetos" link="/projetos" />
            <SidebarItem texto="Historias" link="/historias" />
            <SidebarItem texto="Tarefas" link="/tarefas" />
            <SidebarItem texto="Sprints" link="/sprints" />
        </div>
      </div>
      <div className={style.pagina_conteudo}>{children}</div>
    </div>
  );
}