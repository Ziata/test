import Image from "next/image";
import arrowLeft from "static/img/arrowLeft.svg";
import arrowRight from "static/img/arrowRight.svg";

function Pagination() {
  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <nav
        aria-label="Pagination"
        className="flex justify-center  items-center text-[#33566C]"
      >
        <a href="#" className="p-2 mr-4 rounded group">
          <Image src={arrowLeft} alt="left" />
        </a>
        <a
          href="#"
          className="px-2 md:px-4 py-2 rounded hover:bg-gray-100 text-[#F05022]"
        >
          01
        </a>
        <a href="#" className="px-2 md:px-4 py-2 rounded hover:bg-gray-100">
          02
        </a>
        <a href="#" className="px-2 md:px-4 py-2 rounded hover:bg-gray-100">
          03
        </a>
        <span className="px-2 md:px-4 py-2 rounded">.....</span>
        <a href="#" className="px-2 md:px-4 py-2 rounded hover:bg-gray-100">
          12
        </a>
        <a href="#" className="p-2 ml-4 rounded hover:bg-gray-100">
          <Image src={arrowRight} alt="left" />
        </a>
      </nav>
    </div>
  );
}

export default Pagination;
