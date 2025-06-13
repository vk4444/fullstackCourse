import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { Link, useParams, useNavigate } from "react-router-dom";

import Comments from "./Comments";

const BlogDetail = () => {
  const id = useParams().id;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/blogs");
    },
  });

  const addLike = async () => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
      comments: blog.comments,
    };

    likeBlogMutation.mutate(updatedBlog);
  };

  const deleteBlog = async () => {
    const id = blog.id;
    deleteBlogMutation.mutate(id);
  };

  const result = useQuery({
    queryKey: ["blog"],
    queryFn: () => blogService.getById(id),
  });

  if (result.isPending) {
    return <div>loading data...</div>;
  }

  const blog = result.data;
  return (
    <div>
      <h2>{blog.title}</h2>
      <Link to={blog.url}>{blog.url}</Link>
      <p>
        {blog.likes} likes <button onClick={addLike}>like</button>
      </p>
      <p>added by {blog.author}</p>
      <button onClick={deleteBlog}>delete</button>
      <Comments comments={blog.comments} blog={blog} />
    </div>
  );
};

export default BlogDetail;
