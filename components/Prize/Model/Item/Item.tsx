import { useEffect } from "react";
import { useCollapse } from "react-collapsed";
import Image from "next/future/image";

export default function Item({
  data,
  active,
}: {
  data: { title: string; text: string; image: string };
  active: boolean;
}) {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
    useCollapse();

  useEffect(() => {
    setExpanded(active);
  }, [active]); // eslint-disable-line

  return (
    <div className="py-5 border-b-[rgba(0, 0, 0, 0.10);] border-b-[1px] border-solid">
      <div
        {...getToggleProps()}
        className="text-[#F05022] text-xl flex justify-between"
      >
        <div>{data.title}</div>
        <Image
          src={"/images/prize/arrow.svg"}
          alt="arrow"
          width={10}
          height={10}
          className={
            isExpanded
              ? "rotate-0 transition-all duration-300"
              : "rotate-[270deg] transition-all duration-300"
          }
        />
      </div>
      <div {...getCollapseProps()} className="pt-[10px]">
        {data.text}
      </div>
    </div>
  );
}
