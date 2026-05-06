import { useNavigate } from "react-router-dom";

import "./categoryMenu.css";

export const CategoryMenu = () => {
  const navigate = useNavigate();

  const goTo = (platform, category) => {
    navigate(`/products/${platform}/${category}`);
  };

  return (
    <div className="category-menu">
      <ul className="menu">

        <li className="menu-item">
          Xbox
          <ul className="submenu">
            <li onClick={() => goTo("xbox", "modern")}>Moderno</li>
            <li onClick={() => goTo("xbox", "classic")}>Clássico</li>
            <li onClick={() => goTo("xbox", "retro")}>Retrô</li>
          </ul>
        </li>

        <li className="menu-item">
          PlayStation
          <ul className="submenu">
            <li onClick={() => goTo("playstation", "modern")}>Moderno</li>
            <li onClick={() => goTo("playstation", "classic")}>Clássico</li>
            <li onClick={() => goTo("playstation", "retro")}>Retrô</li>
          </ul>
        </li>

        <li className="menu-item">
          Nintendo
          <ul className="submenu">
            <li onClick={() => goTo("nintendo", "modern")}>Moderno</li>
            <li onClick={() => goTo("nintendo", "classic")}>Clássico</li>
            <li onClick={() => goTo("nintendo", "retro")}>Retrô</li>
          </ul>
        </li>

      </ul>
    </div>
  );
};