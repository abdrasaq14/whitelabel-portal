import Spinner from "@/components/feedbacks/Spinner";
import { SpinnerType } from "@/enums/ComponentEnums";

const Loading = () => {
  return (
    <div className="h-[50px] w-[50px] bg-black flex justify-center items-center">
      <Spinner type={SpinnerType.PRIMARY} />
    </div>
  )
};

export default Loading;