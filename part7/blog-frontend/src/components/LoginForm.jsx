import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import MessageContext from "../contexts/MessageContext";
import UserContext from "../contexts/UserContext";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, messageDispatch] = useContext(MessageContext);
  const [user, userDispatch] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/blogs");
    }
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      userDispatch({ type: "SET", payload: user });
      setUsername("");
      setPassword("");
    } catch (exception) {
      messageDispatch({ type: "SET", payload: "Wrong credentials" });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    userDispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
