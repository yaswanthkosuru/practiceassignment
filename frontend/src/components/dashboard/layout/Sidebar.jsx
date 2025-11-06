import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useLang from "../../../hooks/useLang";
import { menuItems } from "../mockData";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useLang();

  const handleMenuClick = (itemId) => {
    if (itemId === "logout") {
      logout();
      navigate("/");
    } else if (itemId === "pricelist") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/${itemId}`);
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
                className={`menu-item ${item.active ? "menu-item-active" : ""}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{t(`dashboard.${item.id}`) || item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
