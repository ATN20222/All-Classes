import React, { useEffect, useRef, useState } from "react";
import "./ChatComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";
import { ChatService } from "../../Services/Api";
import Echo from "laravel-echo";
import Pusher from 'pusher-js';
import { getToken } from "../../Services/AxiosApi";


const ChatComponent = ({ ChatId, Name, isOpen, toggleChat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  window.Pusher = Pusher;

  const echo = new Echo({
    broadcaster: 'pusher',
    key: '81c558fbfd3ec3d7f363',
    cluster: 'eu',
    forceTLS: true,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'https://all-classes.com/broadcasting/auth', 
    auth: {
      headers: {
        Authorization: `Bearer ${getToken()}`, 
      },
    }
  
  });
  

  useEffect(() => {
    getChat();
  }, [ChatId]);


  async function getChat() {
    setIsLoading(true);
    try {
      const response = await ChatService.GetById(ChatId);
      setChatName(Name);
      setMessages(response.content.messages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e) => {
  };



  const sendMessage = async () => {
    const msg = message;
    setMessage('');
    try {
        await ChatService.SendMessages(ChatId, msg);
        setMessage('');
    } catch (error) {
      setMessage(msg)
      console.error('Send Message Error:', error);
    }
};

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  
  useEffect(() => {
    const channel = echo.private(`chat.${ChatId}`); 
    
    channel.listen('MessageSent', (data) => {
      console.log("data",data);
      setMessages((prevMessages) => [...prevMessages, data.content]);
    });

    return () => {
      echo.leave(`chat.${ChatId}`);
      // channel.stopListening('MessageSent'); 
    };
  }, [ChatId]);

  
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}, [messages]);

  return (
    <div className={`chat-container ${isOpen ? "chat-open" : ""}`}>
      <div className="chat-header" onClick={toggleChat}>
        <span className="ChattedName">{chatName}</span>
        <span>{isOpen ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}</span>
      </div>

      {isOpen && (
        <div className="chat-body">
          {isLoading ? (
            <div className="loading-indicator">Loading chat...</div> // Loading indicator
          ) : (
            <div className="MessagesContainer p-2">
              {messages.map((row) =>
                !row.recieved ? (
                  <MessageReceived key={row.id} text={row.message} timestamp={row.created_at} />
                ) : (
                  <MessageSent key={row.id} text={'hello hello'} timestamp="Nov 27, 2024, 10:15 AM" />
                )
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          <div className="chat-input">
            <textarea
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              value={message}
              placeholder="Type a message..."
            />
            <button
              onClick={() => {
                if (message.trim()) {
                  sendMessage();
                }
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
