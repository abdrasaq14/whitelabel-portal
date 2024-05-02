import React, { useState } from 'react';
import { FaCopy } from "react-icons/fa";
// import ReactTooltip from 'react-tooltip';
import toast from 'react-hot-toast';

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    
      .then(() => {
        toast.success("copied")
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <div>
      <button onClick={handleCopy} className="text-primary"  >
      <FaCopy />
      </button> 
     
    </div>
  );
};

export default CopyToClipboard;
