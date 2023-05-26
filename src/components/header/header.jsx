import { Link } from "react-router-dom";
import "./header.css";
import Rick_and_Morty_logo from "../../img/Rick_and_Morty_logo.png";
import Menu from "../menu/menu";
import { useDispatch, useSelector } from "react-redux";
import { isMenuActive } from "../../sliceRedux/sliceMenu";

const Header = ({ items }) => {
  const menuActive = useSelector((state) => state.menu.menuActive);
  const dispatch = useDispatch();
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
            dispatch(isMenuActive(!menuActive));
            body.classList.toggle("lock");
          }}
        >
          <span className="material-symbols-outlined">menu</span>
        </div>
      </div>

      <Menu items={items} />
    </div>
  );
};
export default Header;
