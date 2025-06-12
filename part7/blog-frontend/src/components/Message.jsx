import { useEffect, useContext } from "react";
import MessageContext from "../contexts/MessageContext";

const Message = () => {
  const [message, messageDispatch] = useContext(MessageContext);

  // Handle message timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        messageDispatch({ type: "CLEAR" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (message) {
    return (
      <div>
        <p>{message}</p>
      </div>
    );
  }
};

export default Message;
