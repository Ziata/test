import { generateUniqueId } from "@/utils";
import Image from "next/image";
import arrowLeft from "static/img/arrowLeft.svg";
import arrowRight from "static/img/arrowRight.svg";

function Pagination({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}) {
  const pageNumbers: number[] = [];
  const maxVisiblePages = 5;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (pageNumbers.length <= maxVisiblePages) {
      return pageNumbers.map((number) => (
        <button
          key={generateUniqueId()}
          onClick={() => paginate(number)}
          className={`${
            currentPage === number ? "text-[#F05022]" : ""
          } px-2 md:px-4 py-2 rounded hover:bg-gray-100`}
        >
          {number}
        </button>
      ));
    }

    const visiblePages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(
      currentPage + 1,
      Math.ceil(totalPosts / postsPerPage)
    );

    if (startPage > 1) {
      visiblePages.push(
        <button
          key={generateUniqueId()}
          onClick={() => paginate(1)}
          className={`px-2 md:px-4 py-2 rounded hover:bg-gray-100`}
        >
          1
        </button>
      );

      visiblePages.push(
        <button
          key="start-ellipsis"
          className="px-2 md:px-4 py-2 pointer-events-none"
        >
          ...
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(
        <button
          key={generateUniqueId()}
          onClick={() => paginate(i)}
          className={`${
            currentPage === i ? "text-[#F05022]" : ""
          } px-2 md:px-4 py-2 rounded hover:bg-gray-100`}
        >
          {i}
        </button>
      );
    }

    if (endPage < pageNumbers.length) {
      visiblePages.push(
        <button
          key="end-ellipsis"
          className="px-2 md:px-4 py-2 pointer-events-none"
        >
          ...
        </button>
      );

      visiblePages.push(
        <button
          key={generateUniqueId()}
          onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
          className={`px-2 md:px-4 py-2 rounded hover:bg-gray-100`}
        >
          {Math.ceil(totalPosts / postsPerPage)}
        </button>
      );
    }

    return visiblePages;
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <nav
        aria-label="Pagination"
        className="flex justify-center  items-center text-[#33566C]"
      >
        <button
          onClick={() => paginate(currentPage - 1)}
          className={`px-2 md:px-4 py-2 rounded hover:bg-gray-100 ${
            currentPage === 1
              ? "pointer-events-none opacity-20 select-none"
              : ""
          }`}
          disabled={currentPage === 1}
        >
          <Image src={arrowLeft} alt="Previous" />
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => paginate(currentPage + 1)}
          className={`px-2 md:px-4 py-2 rounded hover:bg-gray-100 ${
            currentPage === Math.ceil(totalPosts / postsPerPage)
              ? "pointer-events-none opacity-20 select-none"
              : ""
          }`}
          disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
        >
          <Image src={arrowRight} alt="Next" />
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
