import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useContext } from "react";
import MessageContext from "../contexts/MessageContext";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

const CreateNewForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [message, messageDispatch] = useContext(MessageContext);

  const queryClient = useQueryClient();

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    createBlogMutation.mutate({
      title: title,
      author: author,
      url: url,
    });

    messageDispatch({
      type: "SET",
      payload: `Blog: ${title} by ${author} was added`,
    });

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>title: </label>
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        <label>author: </label>
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        <label>url: </label>
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form>
  );
};

CreateNewForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default CreateNewForm;
