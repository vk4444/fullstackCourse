import { useEffect, useContext } from "react";
import { MessageContextProvider } from "./contexts/MessageContext";
import UserContext from "./contexts/UserContext";
import { Routes, Route } from "react-router-dom";

import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import Message from "./components/Message";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Header from "./components/Header";
import UserDetail from "./components/UserDetail";
import BlogDetail from "./components/BlogDetail";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);

  // Handle user persistence
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      userDispatch({ type: "SET", payload: user });
    }
  }, []);

  return (
    <MessageContextProvider>
      {user && <Header />}
      <Message />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </MessageContextProvider>
  );
};

export default App;
