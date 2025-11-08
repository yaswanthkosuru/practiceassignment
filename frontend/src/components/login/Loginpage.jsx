import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import useLang from "../../hooks/useLang";
import useAuth from "../../hooks/useAuth";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

const Loginpage = () => {
  const { t } = useLang();
  const { login, user, authToken } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user || authToken) {
      navigate("/dashboard");
    }
  }, [user, authToken, navigate]);

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
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError(t("login.errors.emailRequired"));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t("login.errors.emailInvalid"));
      return;
    }

    if (!password) {
      setPasswordError(
        t("login.errors.passwordRequired") || "Password is required"
      );
      return;
    }

    try {
      setLoading(true);
      await login(email, password);

      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/dashboard");
    } catch (error) {
      if (error.message === "User does not exist") {
        setEmailError(t("login.errors.userNotFound"));
      } else if (error.message === "Invalid username or password") {
        setPasswordError(t("login.errors.invalidCredentials"));
      } else {
        setPasswordError(
          error.message || "Invalid credentials. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
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
                  {showPassword ? (
                    <svg
                      id="show-password-img"
                      onClick={togglePasswordVisibility}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        color: "#a0aec0",
                        opacity: "0.7",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "0.7")
                      }
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg
                      id="show-password-img"
                      onClick={togglePasswordVisibility}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        color: "#a0aec0",
                        opacity: "0.7",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "0.7")
                      }
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </div>
              </div>

              <span className="password-error-span error-span">
                {passwordError}
              </span>
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
    </div>
  );
};

export default Loginpage;
