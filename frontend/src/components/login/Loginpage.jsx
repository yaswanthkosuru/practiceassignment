import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import useLang from "../../hooks/useLang";
import useAuth from "../../hooks/useAuth";

const Loginpage = () => {
  const { t } = useLang();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      setEmailError("");
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      setPasswordError("");
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setLoginError("");

    if (!email) {
      setEmailError(t("login.errors.emailRequired"));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t("login.errors.emailInvalid"));
      return;
    }

    if (!password) {
      setPasswordError(t("login.errors.passwordRequired") || "Password is required");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setLoginError(error.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-content-root">
      <div className="back-login">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <h2 className="login-heading">{t("login.heading")}</h2>

          <section className="login-section">
            <div className="login-email">
              <div>
                <label htmlFor="email" className="login-email-label">
                  {t("login.emailLabel")}
                </label>
              </div>
              <input
                className="login-input"
                type="email"
                id="email"
                required
                name="username"
                autoComplete="on"
                placeholder={t("login.emailPlaceholder")}
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <span className="email-error-span error-span">{emailError}</span>

            <div className="login-password">
              <div>
                <label htmlFor="password" className="login-password-label">
                  {t("login.passwordLabel")}
                </label>
              </div>

              <div className="password-input-div">
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  name="password"
                  placeholder={t("login.passwordPlaceholder")}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <img
                  id="show-password-img"
                  onClick={togglePasswordVisibility}
                  src={
                    showPassword
                      ? "https://online.123fakturera.se/components/icons/show_password.png"
                      : "https://online.123fakturera.se/components/icons/hide_password.png"
                  }
                  alt={showPassword ? t("login.hidePassword") : t("login.showPassword")}
                />
              </div>
            </div>

            <span className="password-error-span error-span">{passwordError}</span>

            <section className="invalid-credentials">
              {loginError && <p style={{ color: 'red', margin: '10px 0' }}>{loginError}</p>}
            </section>
          </section>

          <div className="Login-Button-div">
            <button className="Login-Button" type="submit" disabled={loading}>
              {loading ? "Loading..." : t("login.submitButton")}
            </button>
          </div>
        </form>

        <section className="gotodifferntlink">
          <a href="/register" className="login-new-customer">
            {t("login.registerLink")}
          </a>
          <a
            id="forgot-password-link"
            className="login-forgot-password"
            href="/forgot-password"
          >
            {t("login.forgotPasswordLink")}
          </a>
        </section>
      </div>
    </div>
  );
};

export default Loginpage;
