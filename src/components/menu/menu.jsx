import React from "react";
import { Link } from "react-router-dom";
import "./menu.scss";

const Menu = ({ items, active, setActive }) => {
  return (
    <div className={active ? "menu active" : "menu"}>
      <div className="menu__content">
        <nav class="nav">
          <ul>
            {items.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    setActive(false);
                  }}
                >
                  <Link to={item.href}>{item.value}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Menu;
