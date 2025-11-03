import React from "react";
import "./Footer.css";
import useLang from "../../hooks/useLang";

const Footer = () => {
  const { t } = useLang();
  return (
    <div className="footer">
      <footer className="footer-div" style={{ position: "relative" }}>
        <div
          style={{
            paddingBottom: "40px",
            marginBottom: "10px",
            borderBottom: "1px solid white",
          }}
          className="footer--text-section"
        >
          <div className="footer--lettafaktura-text">{t("footer.brand")}</div>
          <div className="footer-menu">
            <a href="/">
              <span>
                <p>{t("footer.home")}</p>
              </span>
            </a>
            <a href="/">
              <span>
                <p>{t("footer.order")}</p>
              </span>
            </a>
            <a href="/">
              <span>
                <p>{t("footer.contact")}</p>
              </span>
            </a>
          </div>
        </div>
        <div style={{ marginTop: "10px" }} className="footer-copyright">
          <p className="copyright-text">{t("footer.copyright")}</p>
        </div>
        <div style={{ margin: "20px" }}></div>
      </footer>
    </div>
  );
};

export default Footer;
