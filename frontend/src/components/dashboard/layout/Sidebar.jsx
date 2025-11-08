import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useLang from "../../../hooks/useLang";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, getMenuItems } = useLang();
  const menuItems = getMenuItems();

  const handleMenuClick = (itemId, route) => {
    if (itemId === "logout") {
      logout();
      navigate("/");
    } else {
      navigate(route);
    }
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <nav className="sidebar-nav">
          <h3 className="sidebar-menu-title">{t("dashboard.menu") || "Menu"}</h3>
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="menu-item"
                onClick={() => handleMenuClick(item.id, item.route)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
