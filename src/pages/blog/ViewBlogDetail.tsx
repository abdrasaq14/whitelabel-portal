import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { noContentImage } from "../../assets/blog";
import { TiHeartFullOutline } from "react-icons/ti";
import { BsChatSquareText } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();
  
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbWithBackButton
            backText="Blog"
            showBackButton={true}
            currentPath="Preview"
            handleBackAction={() => {navigate("/blog")}}
          />

          <div className="flex justify-between items-center text-primary-text">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-2xl font-bold font-gooperSemiBold">
                Blog Post
              </h2>
              <div className="flex gap-4 text-primary-text">
                <span className="flex items-center gap-2">
                  <TiHeartFullOutline size={20} className="text-[#D42620]" />
                  10k Like
                </span>
                <span className="flex items-center gap-2">
                  <BsChatSquareText size={20} />
                  202 Comments
                </span>
                <span className="flex items-center gap-2">
                  July 16, 2024
                  <GoDotFill />3 mins read
                </span>
              </div>
            </div>
            <button
              type="button"
              className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
            >
              Post Blog
            </button>
          </div>
          <div className="w-full flex gap-8 flex-col items-center justify-center mt-8">
            <div className="">
              <img
                src={noContentImage}
                alt=""
                className="object-cover w-full max-h-[300px]"
              />
            </div>
            <div className="">
              <p className="">
                Lorem ipsum dolor sit amet consectetur. Lacus aliquet
                pellentesque velit cursus ultrices. Habitant consectetur id
                viverra in eleifend commodo id. Id nec nulla duis feugiat in
                quis integer lectus. A amet sagittis senectus vel mauris nibh
                lacinia egestas. Tellus pretium orci risus in iaculis. At
                eleifend nunc mauris id augue tristique consequat amet commodo.
                Tellus facilisi orci in facilisis enim pellentesque. Posuere
                dolor in faucibus tempus tortor ac habitant fames. Consequat nec
                nisi mi maecenas ornare nec. Aliquam dui posuere vulputate
                lectus eget ornare diam cum nisi. Consectetur pellentesque cras
                in semper ut. Consectetur placerat ac facilisis scelerisque
                metus sit. Nec integer sed vitae volutpat amet sit magna
                dictumst. Ullamcorper id quis tellus elit. In consectetur at
                fringilla dignissim gravida enim morbi. Nunc nullam quis
                molestie lacus sit pellentesque. Cras pretium sed in mattis
                blandit et quis. Nulla nec proin cursus etiam. Pretium fusce
                diam lectus varius neque et mollis tellus morbi. Sed magna
                dignissim accumsan magna sed ac sed magnis hac. Mattis quam vel
                posuere nulla enim turpis ornare nunc. Ut in eu diam mattis. Sed
                auctor vel lacinia pellentesque urna maecenas semper sem. Mattis
                aliquam amet sit laoreet diam diam vel malesuada. Facilisi velit
                magna risus elementum leo placerat eu in. Purus feugiat id at
                consequat dictumst. Ut neque sit cursus scelerisque libero
                elementum. Placerat non tortor pellentesque quam. Etiam vitae ut
                lacinia arcu molestie interdum amet rutrum mi. Fringilla in sed
                nulla sit arcu purus consectetur sit. Convallis libero odio urna
                integer pulvinar elementum porttitor scelerisque. Purus enim
                sagittis quam vitae nibh cras urna. Ultricies egestas posuere
                sed risus nunc rhoncus mi euismod.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
