import style from "./Topbar.module.css";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useTheme } from "../../ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs"; // Ícones para alternar temas

export function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={style.topbar}>
      {/* Botão para alternar tema */}
      <button onClick={toggleTheme} className={style.themeToggle}>
        {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
      </button>

      <Link to="/" className={style.logoutButton}>
        <MdLogout size={24} />
      </Link>
    </div>
  );
}
