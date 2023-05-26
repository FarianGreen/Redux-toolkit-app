import React from "react";
import { Link } from "react-router-dom";
import "./menu.scss";
import { useDispatch, useSelector } from "react-redux";
import { isMenuActive } from "../../sliceRedux/sliceMenu";

const Menu = ({ items }) => {
  const menuActive = useSelector((state) => state.menu.menuActive);
  const dispatch = useDispatch();
  return (
    <div className={menuActive ? "menu active" : "menu"}>
      <div className="menu__content">
        <nav class="nav">
          <ul>
            {items.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    dispatch(isMenuActive(false));
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
