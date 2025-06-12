import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../contexts/UserContext";
import blogService from "../services/blogs";

import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import CreateNewForm from "./createNewForm";

const BlogList = () => {
  const [user, userDispatch] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const blogFormRef = useRef();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const fetchedBlogs = result.data;
  const blogs = [...fetchedBlogs].sort((a, b) => b.likes - a.likes);

  const updateBlogs = (newBlogs) => {
    const sortedBlogs = [...newBlogs].sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };

  return (
    <div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <CreateNewForm
          blogs={blogs}
          onSubmitSuccess={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={updateBlogs} />
      ))}
    </div>
  );
};

export default BlogList;
