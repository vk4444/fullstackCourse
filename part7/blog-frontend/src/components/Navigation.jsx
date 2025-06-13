import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <Link to={"/blogs"}>blogs</Link> <Link to={"/users"}>users</Link>
    </>
  );
};

export default Navigation;
