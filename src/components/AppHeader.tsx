import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header style={{ width: '100%'}}>
      <nav style={{ display: 'flex', justifyContent: 'space-between'}}>
        <NavLink
          to="/"
        >
          Объявления
        </NavLink>
        <NavLink
          to="/orders"
        >
          Заказы
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
