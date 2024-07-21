import React, { useState } from 'react';
import styles from './ChatBox.module.css';

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: string; ai: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = input;
    setMessages([...messages, { user: userMessage, ai: '...' }]);
    setInput('');

    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userMessage }),
    });

    const data = await response.json();
    setMessages((prevMessages) =>
      prevMessages.map((msg, index) =>
        index === prevMessages.length - 1 ? { user: msg.user, ai: data.response } : msg
      )
    );
  };

  return (
    <>
      <button className={styles.icon} onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-regular fa-message"></i>
      </button>
      {isOpen && (
        <div className={styles.chatbox}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div key={index}>
                <div className={styles.boxmessage}>
                  <strong style={{ display: 'block', textAlign: 'right'}}>You:</strong> 
                  <div className={styles.message}>{msg.user}</div>
                </div>
                <div className={styles.boxmessage}>
                  <strong style={{ display: 'block', textAlign: 'left'}}>AI:</strong> 
                  <div className={styles.reply}>{msg.ai}</div>
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className={styles.input}
          />
        </div>
      )}
    </>
  );
};

export default ChatBox;
