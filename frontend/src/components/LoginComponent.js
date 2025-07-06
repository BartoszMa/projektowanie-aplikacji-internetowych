import { useState } from "react";
import axios from "axios";
import { toaster } from "./ui/toaster";
import { AuthForm, AuthInput } from "./AuthForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:4200/api/authentication",
        {
          headers: {
            username,
            password,
          },
          validateStatus: (status) => status < 500,
        }
      );
      console.log(response);

      if (response.status === 200 && response.data.authenticated === true) {
        login(username);
        toaster.success({
          title: "Zalogowano",
          description: `Witaj, ${username}`,
        });

        if (username === "admin") {
          navigate("/admin");
        } else {
          navigate("/login");
        }
      } else {
        const errorMessage =
          response.data?.error || "Nieprawidłowe dane logowania";
        setError(errorMessage);
        toaster.error({
          title: "Nie udało się zalogować",
          description: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Nie udało się zalogować. Spróbuj ponownie później.";
      setError(errorMessage);
      toaster.error({
        title: "Error",
        description: errorMessage,
      });
    }
  };

  return (
    <AuthForm
      title="Logowanie"
      onSubmit={handleLogin}
      error={error}
      buttonText="Zaloguj"
    >
      <AuthInput
        label="Nazwa użytkownika"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <AuthInput
        label="Hasło"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </AuthForm>
  );
};

export default LoginComponent;
