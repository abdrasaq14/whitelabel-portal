import { GoTrash } from "react-icons/go";
import React from "react";

interface CommentCardProps {
  comment: {
    comment: string;
    name: string;
    userId: string;
    createdAt?: any;
  };
}
const  CommentCard:React.FC<CommentCardProps> = ({comment})=> {
  return (
    <div className="flex p-4 flex-col w-[270px] h-[10rem] max-h-[15rem] bg-[#F2F2F2] rounded-md overflow-y-scroll">
      <div className="min-h-[70%]">
        <span className="text-primary-text text-sm">{comment.comment}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="h-10 w-10 max-h-10-max-w-10 rounded-full overflow-hidden">
            <img
              src="/images/avatar.svg"
              alt=""
              className="object-cover w-full h-full rounded-full"
            />
          </span>
          <span className="text-primary-text text-sm">{comment?.name ? comment.name : "Anonymous"}</span>
        </div>
        <div className="flex gap-1 items-center justify-center px-2 py-1 text-[#D42620] cursor-pointer bg-[#FBE9E9] rounded-md text-sm">
          <GoTrash size={15} className="" />
          Delete
        </div>
      </div>
    </div>
  );
}

export default CommentCard