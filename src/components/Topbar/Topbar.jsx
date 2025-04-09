import style from "./Topbar.module.css";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useTheme } from "../../ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token
    navigate("/"); // Redireciona para a página de login
  };

  return (
    <div className={style.topbar}>
      {/* Botão para alternar tema */}
      <button onClick={toggleTheme} className={style.themeToggle}>
        {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
      </button>

      {/* Botão de logout */}
      <button onClick={handleLogout} className={style.logoutButton}>
        <MdLogout size={24} />
      </button>
    </div>
  );
}
