import { useState } from "react";
import "./Loginpage.css";
import Footer from "../Footer/Footer";

const Loginpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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
    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // If validation passes, proceed with login
    console.log("Form submitted with email:", email);
  };

  return (
    <div>
      <div className="login-content-root">
        <div className="back-login">
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <h2 className="login-heading">Logga in</h2>

            <section className="login-section">
              <div className="login-email">
                <div>
                  <label htmlFor="email" className="login-email-label">
                    Skriv in din epost adress
                  </label>
                </div>
                <input
                  className="login-input"
                  type="email"
                  id="email"
                  required
                  name="username"
                  autoComplete="on"
                  placeholder="Epost adress"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <span className="email-error-span error-span">{emailError}</span>

              <div className="login-password">
                <div>
                  <label htmlFor="password" className="login-password-label">
                    Skriv in ditt lösenord
                  </label>
                </div>

                <div className="password-input-div">
                  <input
                    className="login-input"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    name="password"
                    placeholder="Lösenord"
                  />
                  <img
                    id="show-password-img"
                    onClick={togglePasswordVisibility}
                    src={
                      showPassword
                        ? "https://online.123fakturera.se/components/icons/show_password.png"
                        : "https://online.123fakturera.se/components/icons/hide_password.png"
                    }
                    alt={showPassword ? "Hide password" : "Show password"}
                  />
                </div>
              </div>

              <span className="password-error-span error-span"></span>

              <section className="invalid-credentials"></section>
            </section>

            <div className="Login-Button-div">
              <button className="Login-Button" type="submit">
                Logga in
              </button>
            </div>
          </form>

          <section className="gotodifferntlink">
            <a href="/register" className="login-new-customer">
              Registrera dig
            </a>
            <a
              id="forgot-password-link"
              className="login-forgot-password"
              href="/forgot-password"
            >
              Glömt lösenord?
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Loginpage;
