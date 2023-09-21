import { ICategory } from "@/services/interface";

function Tabs({
  subcategories,
  selectedSubcategory,
  onSubcategoryClick,
}: {
  subcategories: ICategory[];
  selectedSubcategory: string;
  onSubcategoryClick: (subcategory: string) => void;
}) {
  return (
    <div className="w-full mt-[20px] md:mt-0 flex gap-[8px] md:gap-[18px] flex-wrap">
      {subcategories?.map((subcategory, index) => (
        <>
          <button
            className={`${
              subcategory.name === selectedSubcategory
                ? "font-bold underline"
                : ""
            }  text-base leading-5 flex items-center font-Din text-[#33566C] hover:text-[#0071BC] transition-all duration-300`}
            onClick={() => onSubcategoryClick(subcategory.name)}
          >
            {subcategory.name}
            {}
          </button>
          {index !== subcategories.length - 1 && (
            <span className="text-base leading-5 flex items-center font-Din text-[#33566C] hover:text-[#0071BC] transition-all duration-300">
              |
            </span>
          )}
        </>
      ))}
    </div>
  );
}

export default Tabs;
