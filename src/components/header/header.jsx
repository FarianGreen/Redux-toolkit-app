import { Link } from "react-router-dom";
import "./header.css";
import Rick_and_Morty_logo from "../../img/Rick_and_Morty_logo.png";
import Menu from "../menu/menu";

const Header = ({ menuActive, setMenuActive, items, RMservice }) => {
  const body = document.body;
  return (
    <div className="header">
      <div className="wrap__logo">
        <Link className="header-link" to="/">
          <img src={Rick_and_Morty_logo} className="logo" />
        </Link>
      </div>
      <div className="nav-burger">
        <div
          className="burger-btn"
          onClick={() => {
            setMenuActive(!menuActive);
            body.classList.toggle("lock");
          }}
        >
          <span className="material-symbols-outlined">menu</span>
        </div>
      </div>

      <Menu active={menuActive} setActive={setMenuActive} items={items} />
    </div>
  );
};
export default Header;
