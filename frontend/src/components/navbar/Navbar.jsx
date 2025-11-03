import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import useLang from "../../hooks/useLang";

export default function Navbar() {
  const { t, language, changeLanguage } = useLang();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const menuRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { nameKey: "nav.home", path: "/" },
    { nameKey: "nav.order", path: "/" },
    { nameKey: "nav.customers", path: "/" },
    { nameKey: "nav.about", path: "/" },
    { nameKey: "nav.contact", path: "/" },
  ];

  const languages = {
    en: {
      code: "en",
      name: "English",
      flag: "https://storage.123fakturere.no/public/flags/GB.png",
    },
    sv: {
      code: "sv",
      name: "Svenska",
      flag: "https://storage.123fakturere.no/public/flags/SE.png",
    },
  };

  const selectedLang = languages[language] || languages.en;

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsLangOpen(false);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLangMenu = () => {
    if (!isLangOpen) {
      setIsMenuOpen(false);
    }
    setIsLangOpen(!isLangOpen);
  };

  const selectLanguage = (lang) => {
    changeLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <nav className="navigation-out">
      <header className="navigation-header">
        <section className="navigation-section">
          <div className="logoa">
            <a href="/">
              <img
                src="https://storage.123fakturera.se/public/icons/diamond.png"
                alt={t("nav.logo")}
                className="navigation-logo"
              />
            </a>
          </div>

          <div className="open-menu-dds" onClick={toggleMenu} ref={menuRef}>
            {isMenuOpen ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="navigation-svg"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="navigation-svg"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
              </svg>
            )}
          </div>

          <div className={`navigation-menu-bar ${isMenuOpen ? "open" : ""}`}>
            <div
              className="menu-drop-down"
              style={{ height: isMenuOpen ? "300px" : "0" }}
            >
              <div className="menu-drop-down-container">
                {navItems.map((item) => (
                  <a
                    key={item.path}
                    className="menu-drop-down-item"
                    href={item.path}
                  >
                    <p className="menu-item-name">{t(item.nameKey)}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="nav-right-group">
            <div className="pc-menu">
              {navItems.map((item) => (
                <a key={item.path} className="pc-menu-item" href={item.path}>
                  <span className="collectionSpan">{t(item.nameKey)}</span>
                </a>
              ))}
            </div>

            <div className="lang-dropk">
              <div className="dropdownContainer" ref={langRef}>
                <div className="language-box" onClick={toggleLangMenu}>
                  <p className="flag-name">{selectedLang.name}</p>
                  <img
                    src={selectedLang.flag}
                    className="icon-flag-nav"
                    alt={selectedLang.name}
                  />
                </div>

                {isLangOpen && (
                  <div className="dropdownList">
                    {Object.entries(languages).map(([code, lang]) => (
                      <div
                        key={code}
                        className="drop-down-element"
                        onClick={() => selectLanguage(code)}
                      >
                        <p className="flag-name">{lang.name}</p>
                        <img
                          src={lang.flag}
                          className="icon-flag-nav"
                          alt={lang.name}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </header>
    </nav>
  );
}
