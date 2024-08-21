import { FiEdit } from "react-icons/fi";
import { BlogPayload } from "../../services/blog.service";
import { GoTrash } from "react-icons/go";
import { BsChatSquareText } from "react-icons/bs";
import { TiHeartFullOutline } from "react-icons/ti";
import { truncateText } from "../../utils/Helpfunctions";
import { stripHtml } from "../../utils/Helpfunctions";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
export default function BlogCard({
  blog,
  index
}: {
  blog: BlogPayload;
  index: number;
}) {
  // const navigate  = useNavigate();

  return (
    <div
      key={index}
      className="w-[290px] xl:w-[320px] h-[21rem] max-h-[21rem] text-primary-text border border-[#C8CCD0] rounded-md p-4 flex flex-col gap-4 overflow-hidden"
    >
      <div className="flex justify-between">
        <Link to={`/blog/view/${blog._id}`} className="font-bold">
          {blog?.title}
        </Link>
        <span className="flex gap-2">
          <Link to={`/blog/edit/${blog._id}`}>
            <FiEdit size={20} color="#8f9092" className="cursor-pointer" />
          </Link>
          <GoTrash size={20} color="#D42620" className="cursor-pointer" />
        </span>
      </div>
      <Link
        to={`/blog/view/${blog._id}`}
        className="h-[6rem] min-h-[6rem] max-h-[6rem] w-full rounded-md bg-[red] overflow-hidden"
      >
        <img
          src={blog?.image}
          alt=""
          className="object-cover w-full max-h-[6rem]"
        />
      </Link>
      <Link
        to={`/blog/view/${blog._id}`}
        className="w-full h-[12rem] max-h-[12rem] flex-1"
      >
        <p className="text-justify">{truncateText(stripHtml(blog?.content))}</p>
      </Link>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2">
          <TiHeartFullOutline size={20} className="text-[#D42620]" />
          {blog?.likes} {blog?.likes > 1 ? "Likes" : "Like"}
        </span>
        <span className="flex items-center gap-2">
          <BsChatSquareText size={20} />
          {blog?.comments.length}
          {blog?.comments.length > 1 ? " Comments" : " Comment"}
        </span>
      </div>
    </div>
  );
}
