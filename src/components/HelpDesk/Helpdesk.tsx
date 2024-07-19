// HelpDesk.tsx
import React, { useState } from 'react';
import ChatButton from './ChatButton';
import ChatBox from './ChatBox';

const HelpDesk: React.FC = ({isOpen}: any) => {
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };
  

  return (
    <div>
      <ChatButton isOpen={isChatOpen} onClick={toggleChat} />
      {isChatOpen && <ChatBox onClose={toggleChat} />}
    </div>
  );
};

export default HelpDesk;