import useAuth from "../../../hooks/useAuth";
import "./TopNavbar.css";

const TopNavbar = () => {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getLanguageDisplay = () => {
    return "English";
  };

  const getFlagEmoji = () => {
    return "🇬🇧";
  };

  return (
    <nav className="top-navbar">
      <div className="top-navbar-left">
        <button className="hamburger-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="top-user-profile">
          <div className="top-user-avatar">
            {getInitials(user?.username || "User")}
          </div>
          <div className="top-user-info">
            <div className="top-user-name">
              {user?.username || "John Andre"}
            </div>
            <div className="top-user-company">Storfjord AS</div>
          </div>
        </div>
      </div>
      <div className="top-navbar-right">
        <button className="top-language-toggle">
          <span className="language-text">{getLanguageDisplay()}</span>
          <span className="flag-emoji">{getFlagEmoji()}</span>
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
