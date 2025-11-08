import React from "react";
import useLang from "../hooks/useLang";
import "./Terms.css";

const Terms = () => {
  const { t } = useLang();

  const content = t("terms.content");
  const firstSpaceIndex = content.indexOf(" ");
  const firstWord = firstSpaceIndex !== -1 ? content.substring(0, firstSpaceIndex) : content;
  const restOfText = firstSpaceIndex !== -1 ? content.substring(firstSpaceIndex + 1) : "";

  return (
    <div className="terms-container">
      <div className="terms-content">
        {/* Title */}
        <h1 className="terms-title">{t("terms.heading")}</h1>

        {/* Button */}
        <div className="terms-button-wrapper">
          <button onClick={() => window.history.back()} className="terms-button">
            {t("terms.closebutton")}
          </button>
        </div>

        {/* White Content Card */}
        <div className="terms-card">
          <div className="terms-text">
            <strong>{firstWord}</strong> {restOfText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
