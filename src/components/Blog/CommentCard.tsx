import { GoTrash } from "react-icons/go";
import React from "react";
import { Comments } from "../../services/blog.service";

interface CommentCardProps {
  comment: Comments;
  showDeleteIcon?: boolean;
  handleDelete?: (id: string) => void;
}
const  CommentCard:React.FC<CommentCardProps> = ({comment, showDeleteIcon, handleDelete})=> {
  return (
    <div className="flex p-4 flex-col w-[270px] h-[10rem] max-h-[15rem] bg-[#F2F2F2] rounded-md overflow-y-scroll scrollbar-hide">
      <div className="min-h-[60%] flex-1">
        <span className="text-primary-text text-sm">{comment.comment}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="h-10 w-10 border-[2px] border-white max-h-10 flex items-center justify-center max-w-10 rounded-full overflow-hidden">
            {comment?.image ? (
              <img
                src="/images/avatar.svg"
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <span className="bg-[#EDE6F3] flex items-center justify-center text-primary-text text-xl w-full h-full">
                {comment?.name ? comment?.name?.charAt(0).toUpperCase() : "A"}
              </span>
            )}
          </span>
          <span className="text-primary-text text-sm">
            {comment?.name ? comment.name : "Anonymous"}
          </span>
        </div>
        {showDeleteIcon && handleDelete && !comment.isDeleted && (
          <div
            className="flex gap-1 items-center justify-center px-2 py-1 text-[#D42620] cursor-pointer bg-[#FBE9E9] rounded-md text-sm"
            onClick={() => handleDelete(comment._id as string)}
          >
            <GoTrash size={15} className="" />
            Delete
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentCard