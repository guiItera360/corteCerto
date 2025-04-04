export function CardInfo({ title, value, description, info, color }) {
    return (
      <div className={style.card}>
        <div className={style.header}>
          <span className={style.title}>{title}</span>
          {info && <span className={style.info}>ℹ️</span>}
        </div>
        <div className={style.content}>
          <div className={style.circle} style={{ borderColor: color }}>
            <span className={style.value} style={{ color: color }}>{value}</span>
          </div>
          <span className={style.description}>{description}</span>
        </div>
      </div>
    );
  }

  export const style = {
    card: "card",
    header: "header",
    title: "title",
    info: "info",
    content: "content",
    circle: "circle",
    value: "value",
    description: "description",
    listaServicos: "listaServicos",
    listaTitulo: "listaTitulo",
    servicoItem: "servicoItem",
    servicoInfo: "servicoInfo",
    inicial: "inicial",
    nome: "nome",
    detalhes: "detalhes",
    status: "status"
  };