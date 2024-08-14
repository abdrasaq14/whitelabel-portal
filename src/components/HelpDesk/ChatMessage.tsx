import { fDate } from "../../utils/formatTime";
function isFileLink(link: string): boolean {
  const fileRegex = /^(https?|ftp):\/\/[^\s\/]+\/\S+\.(jpg|jpeg|png|gif|pdf|docx|doc|xls|xlsx|ppt|pptx|txt|csv|mp3|mp4|avi|mov|wmv|flv|zip|rar|gz)$/;

  return fileRegex.test(link);
}

const ChatMessage = ({ message, isSentByMe, time }: { message: string; isSentByMe?: boolean, time: any }) => {
    return (
      <div className={`flex  ${isSentByMe ? 'justify-end ml-4' : 'justify-start'} mb-2`}>
        <div className={` text-sm p-2 rounded-t rounded-b rounded-l ${isSentByMe ? 'bg-landingPagePrimaryBg text-black' : 'bg-[#470E810D] text-gray-800'}`}>
          {isFileLink(message) ? <a href={message} target="_blank" className=""><img src={message} /></a> : message}
          <div className={`text-[10px] text-right block ${isSentByMe ? 'text-gray-700' : 'text-gray-600'}`}>
            {fDate(time)}
          </div>
        </div>
      </div>
    );
  };

  export default ChatMessage