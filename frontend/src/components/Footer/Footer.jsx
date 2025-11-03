import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-title">123 Fakturera</h2>
        <nav className="footer-nav">
          <a href="#hem" className="footer-link">
            Hem
          </a>
          <a href="#bestall" className="footer-link">
            Beställ
          </a>
          <a href="#kontakta" className="footer-link">
            Kontakta oss
          </a>
        </nav>
        <div className="footer-divider"></div>
        <p className="footer-copyright">
          © Låttfaktura. CRO no. 638537. 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
