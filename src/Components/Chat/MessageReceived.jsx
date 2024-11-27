import React from "react";
import "./MessageReceived.css";

const MessageReceived = ({ text, timestamp }) => {
  return (
    <div className="message-received">
      <div className="message-bubble">
        <p>{text}</p>
        <span className="message-timestamp">{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageReceived;
