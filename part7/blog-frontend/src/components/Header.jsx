import { useContext } from "react";
import UserContext from "../contexts/UserContext";

import Navigation from "./Navigation";

const Header = () => {
  const [user, userDispatch] = useContext(UserContext);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    userDispatch({ type: "LOGOUT" });
  };

  return (
    <p>
      <p>
        <Navigation /> {user.name} logged in{" "}
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>blog app</h2>
    </p>
  );
};

export default Header;
