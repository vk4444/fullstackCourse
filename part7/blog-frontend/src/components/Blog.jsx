import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

const Blog = ({ blog, blogs, setBlogs }) => {
  const [detailsShown, setDetailsShown] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <Link to={`/blogs/${blog.id}`}>
        <button className="blog">view</button>
      </Link>
    </div>
  );
};

export default Blog;
