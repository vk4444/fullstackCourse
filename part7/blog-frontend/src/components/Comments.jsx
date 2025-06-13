import CreateCommentForm from "./CreateCommentForm";

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * (max + 1));
};

const Comments = ({ comments, blog }) => {
  return (
    <div>
      <h3>comments</h3>
      <CreateCommentForm blog={blog} />
      <ul>
        {comments.map((comment) => (
          <li key={getRandomNumber(1000)}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
