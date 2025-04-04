import style from "./CustomToolbar.module.css";
import { useState, useEffect } from "react";
import React from "react";

const CustomToolbar = ({ label, onNavigate, views, onView, view }) => {
  const handleNavigate = (action) => {
    onNavigate(action);
  };

  // Estado para armazenar a opção atual do dropdown
  const [itemText, setItemText] = useState(view || views[0] || "month");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Atualiza itemText sempre que a view mudar externamente
  useEffect(() => {
    setItemText(view);
  }, [view]);

  return (
    <div className={style.toolbar_container}>
      <h1 className={style.mesAno}>{label}</h1>

      <div className={style.dirtop}>
        <div className={`dropdown ${style.dropdown}`}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {itemText}
          </button>
          <ul
            className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
            aria-labelledby="dropdownMenuButton"
          >
            {views.map((viewOption, index) => (
              <div>
                <li key={index}>
                  <button
                    className={`dropdown-item ${style.dropdown_item}`}
                    onClick={() => {
                      setItemText(viewOption); // Atualiza o estado do botão
                      onView(viewOption); // Altera a visualização do calendário
                      setDropdownOpen(false); // Fecha o dropdown
                    }}
                  >
                    {viewOption}
                  </button>
                </li>
                {index == 2 &&<hr className="dropdown-divider"></hr>}
              </div>
            ))}
          </ul>
        </div>
        <div className="toolbar-navegation" style={{marginLeft: '15px'}}>
          <button className='btn btn-secondary btn-ls mr-2 border-0' onClick={() =>handleNavigate('TODAY')}>Hoje</button>
          <button className='btn btn-sm mr-2 text-secondary' onClick={() =>handleNavigate('PREV')} style={{marginLeft: '15px'}}><i class="bi bi-caret-left"></i></button>
          <button className='btn btn-sm mr-2 text-secondary' onClick={() =>handleNavigate('NEXT')}><i class="bi bi-caret-right"></i></button>
        </div>
      </div>
    </div>
  );
};

export default CustomToolbar;
