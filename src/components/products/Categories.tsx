import React from "react";
interface Props {
  categories: string[];
}
const Categories: React.FC<Props> = ({ categories }) => {
  return (
    <div className="flex items-center whitespace-nowrap flex-wrap gap-1 mt-1">
      {categories &&
        categories.map((category: any, index) => (
          <React.Fragment key={index}>
            <p className="text-accent-darker text-base font-medum font-satoshiMedium">
              {category.title}
            </p>
            {index !== categories.length - 1 && (
              <div className="border-r-[1px] pr-1"></div>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};
export default Categories;