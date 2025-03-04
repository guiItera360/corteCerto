import style from "./Topbar.module.css";
import { Link } from 'react-router-dom';

export function Topbar({ children }) {
    return (
        <div>
            <div className={style.topbar_conteudo}> 
                <Link to="/login" className={style.botao_deslogar}></Link>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>   
    )
}