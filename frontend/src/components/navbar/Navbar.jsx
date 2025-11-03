import { useState } from "react";
import "./Navbar.css";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    code: 'sv',
    name: 'Svenska',
    flag: 'https://storage.123fakturere.no/public/flags/SE.png'
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLangMenu = () => {
    setIsLangOpen(!isLangOpen);
  };

  const selectLanguage = (lang) => {
    const languages = {
      en: {
        code: 'en',
        name: 'English',
        flag: 'https://storage.123fakturere.no/public/flags/GB.png'
      },
      sv: {
        code: 'sv',
        name: 'Svenska',
        flag: 'https://storage.123fakturere.no/public/flags/SE.png'
      }
    };

    setSelectedLang(languages[lang]);
    setIsLangOpen(false);
  };

  return (
    <nav className="navigation-out">
      <header className="navigation-header">
        <section className="navigation-section">
          {/* Hamburger Menu Toggle */}
          <div className="open-menu-dds" onClick={toggleMenu}>
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

          {/* Mobile Dropdown Menu */}
          <div className={`navigation-menu-bar ${isMenuOpen ? "open" : ""}`}>
            <div
              className="menu-drop-down"
              style={{ height: isMenuOpen ? "325px" : "0" }}
            >
              <div className="menu-drop-down-container">
                <a className="menu-drop-down-item" href="/">
                  <p className="menu-item-name">Hem</p>
                </a>
                <a className="menu-drop-down-item" href="/bestall">
                  <p className="menu-item-name">Beställ</p>
                </a>
                <a className="menu-drop-down-item" href="/kunder">
                  <p className="menu-item-name">Våra Kunder</p>
                </a>
                <a className="menu-drop-down-item" href="/omoss">
                  <p className="menu-item-name">Om oss</p>
                </a>
                <a className="menu-drop-down-item" href="/kontakta">
                  <p className="menu-item-name">Kontakta oss</p>
                </a>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="lang-dropk">
            <div className="dropdownContainer">
              <div className="language-box" onClick={toggleLangMenu}>
                <p className="flag-name">{selectedLang.name}</p>
                <img
                  src={selectedLang.flag}
                  className="icon-flag-nav"
                  alt={selectedLang.name}
                />
              </div>

              {/* Language Dropdown */}
              {isLangOpen && (
                <div className="dropdownList">
                  <div
                    className="drop-down-element"
                    onClick={() => selectLanguage('en')}
                  >
                    <p className="flag-name">English</p>
                    <img
                      src="https://storage.123fakturere.no/public/flags/GB.png"
                      className="icon-flag-nav"
                      alt="English"
                    />
                  </div>
                  <div
                    className="drop-down-element"
                    onClick={() => selectLanguage('sv')}
                  >
                    <p className="flag-name">Svenska</p>
                    <img
                      src="https://storage.123fakturere.no/public/flags/SE.png"
                      className="icon-flag-nav"
                      alt="Svenska"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </header>
    </nav>
  );
}
