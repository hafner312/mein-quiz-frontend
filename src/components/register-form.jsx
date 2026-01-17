import { useState } from "react";
import Button from "./button";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateUsername = (value) => {
    if (!value.trim()) {
      setUsernameError("Benutzername ist erforderlich");
      return false;
    }
    if (value.length < 3) {
      setUsernameError("Mindestens 3 Zeichen erforderlich");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError("Email ist erforderlich");
      return false;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!emailOk) {
      setEmailError("Email muss gueltig sein");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Passwort ist erforderlich");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Passwort muss mindestens 6 Zeichen haben");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (value, passwordValue) => {
    if (!value) {
      setConfirmPasswordError("Bitte Passwort bestaetigen");
      return false;
    }
    if (value !== passwordValue) {
      setConfirmPasswordError("Passwoerter stimmen nicht ueberein");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameOk = validateUsername(username);
    const emailOk = validateEmail(email);
    const passwordOk = validatePassword(password);
    const confirmOk = validateConfirmPassword(confirmPassword, password);

    if (!usernameOk || !emailOk || !passwordOk || !confirmOk) {
      return;
    }

    setIsLoading(true);

    const userData = {
      username,
      email,
      password,
    };

    try {
      if (onRegister) {
        await onRegister(userData);
      }
    } catch (error) {
      console.error("RegisterForm Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (hasError, hasValue) => {
    let className = "form-input";
    if (!hasValue) return className;
    if (hasError) return `${className} form-input--error`;
    return `${className} form-input--success`;
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Registrieren</h2>

      <div className="form-group">
        <label htmlFor="username">
          Benutzername <span className="required">*</span>
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            const value = e.target.value;
            setUsername(value);
            if (usernameError) validateUsername(value);
          }}
          placeholder="Dein Benutzername"
          className={getInputClassName(usernameError, username)}
          disabled={isLoading}
        />
        {usernameError && <span className="error-message">{usernameError}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (emailError) validateEmail(value);
          }}
          placeholder="name@beispiel.ch"
          className={getInputClassName(emailError, email)}
          disabled={isLoading}
        />
        {emailError && <span className="error-message">{emailError}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Passwort <span className="required">*</span>
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            if (passwordError) validatePassword(value);
            if (confirmPassword) {
              validateConfirmPassword(confirmPassword, value);
            }
          }}
          placeholder="Mindestens 6 Zeichen"
          className={getInputClassName(passwordError, password)}
          disabled={isLoading}
        />
        {passwordError && <span className="error-message">{passwordError}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">
          Passwort bestaetigen <span className="required">*</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmPassword(value);
            if (confirmPasswordError) {
              validateConfirmPassword(value, password);
            }
          }}
          placeholder="Passwort wiederholen"
          className={getInputClassName(
            confirmPasswordError,
            confirmPassword
          )}
          disabled={isLoading}
        />
        {confirmPasswordError && (
          <span className="error-message">{confirmPasswordError}</span>
        )}
      </div>

      <div className="form-submit">
        <Button
          text={isLoading ? "Lädt..." : "Registrieren"}
          onAnswerClick={handleSubmit}
          disabled={isLoading}
          className="submit-button"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
