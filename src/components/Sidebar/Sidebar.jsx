import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Sidebar.module.css";
import Logo from "../../assets/logos/logo_baber.png";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { PiUsers } from "react-icons/pi";
import { LuCalendarCheck } from "react-icons/lu";
import { RiScissorsLine } from "react-icons/ri";
import { FiBarChart } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { Topbar } from "../Topbar/Topbar";
import { TbMessageChatbot } from "react-icons/tb";

export function Sidebar({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Adiciona um delay de 0.3s para exibição do texto e logo
  useEffect(() => {
    if (isExpanded) {
      const timeout = setTimeout(() => setShowContent(true), 140);
      return () => clearTimeout(timeout);
    } else {
      setShowContent(false);
    }
  }, [isExpanded]);

  return (
    <div className={style.container}>
      {/* Sidebar fixa à esquerda */}
      <div className={`${style.sidebar} ${isExpanded ? style.expanded : ""}`}>
        {/* Header da Sidebar */}
        <div className={style.header}>
          <button
            className={style.menuButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FiMenu size={24} />
          </button>

          {showContent && (
            <Link to="/home" className={style.brand}>
              <span className={style.title}>CorteCerto</span>
              <img src={Logo} alt="Logo-AppBarber" className={style.logo} />
            </Link>
          )}
        </div>

        <hr className={style.linha} />

        <div className={style.sidebarItems}>
          <SidebarItem
            texto="Dashboard"
            link="/home"
            logo={<FiBarChart />}
            isExpanded={isExpanded}
          />
          <hr />
          <SidebarItem
            texto="Agendamentos"
            link="/agendamentos"
            logo={<LuCalendarCheck />}
            isExpanded={isExpanded}
          />
          <hr />
          <SidebarItem
            texto="Clientes"
            link="/usuarios"
            logo={<PiUsers />}
            isExpanded={isExpanded}
          />
          <hr />
          <SidebarItem
            texto="Serviços"
            link="/servicos"
            logo={<RiScissorsLine />}
            isExpanded={isExpanded}
          />
          <hr />
          <SidebarItem
            texto="BarbearIA"
            link="/barbearIA"
            logo={<TbMessageChatbot />}
            isExpanded={isExpanded}
          />
        </div>
      </div>

      {/* Conteúdo principal, que se ajusta conforme a sidebar */}
      <div
        className={`${style.paginaConteudo} ${
          isExpanded ? style.expandedContent : ""
        }`}
      >
        <Topbar />
        {children}
      </div>
    </div>
  );
}
