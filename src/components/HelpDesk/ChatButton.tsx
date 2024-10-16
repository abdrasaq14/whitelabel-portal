// ChatButton.tsx
import React from 'react';
import { IoChatboxSharp } from "react-icons/io5";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean
}

const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick }) => {
  return (
    <div
      className="fixed z-200 bottom-4 h-16 flex items-center justify-center text-lg w-16 right-4 bg-primary text-white p-4 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      {/* Add your chat icon here */}
      {isOpen ? <>&times;</> : <><IoChatboxSharp  /></>}

    </div>
  );
};

export default ChatButton;