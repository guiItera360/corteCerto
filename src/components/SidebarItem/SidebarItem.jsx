import style from "./SidebarItem.module.css";
import { Link } from "react-router-dom";

export function SidebarItem({ texto, link, logo, isExpanded }) {
  return (
    <Link to={link} className={style.sidebarItem}>
      <span className={style.icon}>{logo}</span>
      {isExpanded && <span className={style.text}>{texto}</span>}
    </Link>
  );
}
