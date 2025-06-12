import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const Header = () => {
  const [user, userDispatch] = useContext(UserContext);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    userDispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <h2>blogs</h2>
      <p>{user.name} logged in </p>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Header;
