import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import userService from "../services/users";

const numOfBlogs = (user) => {
  return user.blogs.length;
};

const Users = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const users = result.data;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{numOfBlogs(user)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
