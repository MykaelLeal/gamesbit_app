import "./categoryMenu.css";

export const CategoryMenu = () => {
  return (
    <div className="category-menu">
      <ul className="menu">

        <li className="menu-item">
          Xbox
          <ul className="submenu">
            <li>Moderno</li>
            <li>Clássico</li>
            <li>Retrô</li>
          </ul>
        </li>

        <li className="menu-item">
          PlayStation
          <ul className="submenu">
            <li>Moderno</li>
            <li>Clássico</li>
            <li>Retrô</li>
          </ul>
        </li>

        <li className="menu-item">
          Nintendo
          <ul className="submenu">
            <li>Moderno</li>
            <li>Clássico</li>
            <li>Retrô</li>
          </ul>
        </li>

      </ul>
    </div>
  );
};