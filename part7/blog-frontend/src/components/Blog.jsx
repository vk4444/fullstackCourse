import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  const [detailsShown, setDetailsShown] = useState(false);

  const queryClient = useQueryClient();

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = async () => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    };

    likeBlogMutation.mutate(updatedBlog);
  };

  const deleteNote = async () => {
    const id = blog.id;
    deleteBlogMutation.mutate(id);
  };

  if (!detailsShown) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setDetailsShown(true)} className="blog">
          view
        </button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle} className="blog">
        <p>
          {blog.title}
          <button onClick={() => setDetailsShown(false)}>hide details</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={addLike}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={deleteNote}>delete</button>
      </div>
    );
  }
};

export default Blog;
