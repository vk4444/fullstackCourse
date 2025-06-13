import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useState } from "react";

const CreateCommentForm = ({ blog }) => {
  const [commentInput, setCommentInput] = useState("");
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      setCommentInput("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
      comments: blog.comments.concat(commentInput),
    };

    createCommentMutation.mutate(updatedBlog);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Write a comment..."
      />
      <button>add comment</button>
    </form>
  );
};

export default CreateCommentForm;
