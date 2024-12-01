import { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: '81c558fbfd3ec3d7f363',
  cluster: 'eu',
  forceTLS: true,
});

function App() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const chatId = 1; // Replace with the dynamic chat ID if needed
    const channel = echo.channel(chat.${chatId}); // Subscribe to the correct channel
    
    channel.listen('MessageSent', (data) => {
      setChats((prevMessages) => [...prevMessages, data]); // Update the state with the new message
    });

    return () => {
      channel.stopListening('MessageSent'); // Clean up the event listener when the component unmounts
    };
  }, []);

  return (
    <div className="App">
      <h1>Real-Time Chat</h1>
      {chats.map((item, index) => (
        <div key={index}>
          <strong>{item.user_id}</strong>: {item.message} {/* Adjust user_id or display name */}
        </div>
      ))}
    </div>
  );
}

export default App;