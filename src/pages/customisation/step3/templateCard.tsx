import { template1, template2, template3 } from "../../../assets/customisation";

interface TemplateCardProps {
  index: number;
  image: string;
  title: string;
  selectedTemplate: number;
  onClick: (index: number) => void;
}
function TemplateCard({
  index,
  image,
  title,
  selectedTemplate,
  onClick
}: TemplateCardProps) {
  const isSelected = index === selectedTemplate;
  const color = isSelected ? "border-[#470e81]" : "border-[#C8CCD0]";

  return (
    <div
      key={index}
      onClick={() => onClick(index)}
      className={`w-1/3 flex items-start gap-2 h-[min-8rem] border ${color} rounded-lg p-2 cursor-pointer`}
    >
      <div className="w-[90%] h-full">
        <div className="h-[70%] max-h-[70%]">
          <img src={image} alt="" className=" object-contain h-full w-full" />
        </div>
        <p className=" font-satoshiBold text-sm my-2">{title}</p>
      </div>
      <input
        type="radio"
        name="template"
        checked={isSelected}
        readOnly
        className="hidden"
      />
      <div
        className={`w-4 h-4 rounded-full border-2 ${
          isSelected ? "border-[#4B0082] bg-white" : "border-[#C8CCD0]"
        } flex items-center justify-center`}
      >
        {isSelected && (
          <div className="w-2 h-2 rounded-full bg-[#4B0082]"></div>
        )}
      </div>
    </div>
  );
}

export default TemplateCard;

interface Itemplates {
  title: string;
  image: string;
}
export const templates: Itemplates[] = [
  {
    title: "Template 1",
    image: template1
  },
  {
    title: "Template 2",
    image: template2
  },
  {
    title: "Template 3",
    image: template3
  }
];
