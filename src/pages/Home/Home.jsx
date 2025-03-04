import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import style from "./Home.module.css";

export function Home() {
  return (
        <div className={style.conteudo}>
            <Sidebar>
                <Topbar>
                    <div className={style.pagina_conteudo}>
                        <h3>Home</h3>
                    </div>
                </Topbar>
            </Sidebar>
        </div>
  );
}
