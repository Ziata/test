import Image from "next/image";
import Link from "next/link";
import test from "static/img/test.png";

function SmallPostCard({ isLine = true }: { isLine?: boolean }) {
  return (
    <div
      className={`flex ${
        isLine ? "border-b-2 border-solid border-[#E5E5E5] pb-5 mb-5" : ""
      }`}
    >
      <div className="w-1/3 mr-[15px]">
        <Image src={test} alt="test" />
      </div>
      <div className="w-2/3 flex flex-col justify-between">
        <span className="font-light text-base leading-5 flex items-center text-blue-700 font-Din">
          Science News
        </span>
        <h6 className="text-lg leading-5 flex items-center text-gray-900 font-Din font-bold">
          Lorem ipsum dolor sit amet consectetur suspendisse.
        </h6>
        <span className="font-light text-sm leading-4 flex items-center text-[#33566C] font-Din">
          March 03, 2022
        </span>
      </div>
    </div>
  );
}

export default SmallPostCard;
