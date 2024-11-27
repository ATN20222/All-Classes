
import React from "react";
import "./MessageSent.css";

const MessageSent = ({ text,timestamp }) => {
  return (
    <div className="message-sent">
      <div className="message-bubble">
        <p>{text}</p>
        <span className="message-timestamp">{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageSent;
