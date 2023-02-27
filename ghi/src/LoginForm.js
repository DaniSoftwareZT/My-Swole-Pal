import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Accounts/Auth";
import { useToken } from "./Accounts/Auth";

function LoginForm() {
  const { token, login } = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      console.log("you did it")
    } catch (error) {
      setError("Invalid username or password.");
    }
  };


  return (
    <div>
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
export default LoginForm
