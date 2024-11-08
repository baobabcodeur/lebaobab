// Message.tsx
import React from 'react';
import './message.scss';

type MessageProps = {
  user: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
};

const Message: React.FC<MessageProps> = ({ user, content, timestamp, isCurrentUser }) => {
  return (
    <div className={`message ${isCurrentUser ? 'message-current-user' : ''}`}>
      <div className="message-header">
        <span className="message-user">{user}</span>
        <span className="message-timestamp">{timestamp}</span>
      </div>
      <p className="message-content">{content}</p>
    </div>
  );
};

export default Message;
