import { IPost } from "@/services/interface";
import { formatDate } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";

function SmallPostCard({
  post,
  isHiddenLine = false,
}: {
  post: IPost;
  isHiddenLine?: boolean;
}) {
  const router = useRouter();

  return (
    <Link
      href={`/${router.query.lang}/post/${post.post_name}`}
      className={`flex cursor-pointer ${
        isHiddenLine
          ? ""
          : "border-b-2 border-solid border-[#E5E5E5] pb-3 mb-3 md:pb-5 md:mb-5"
      }`}
    >
      <div
        className={`w-1/3 mr-[15px]`}
        style={{
          backgroundImage: `url(${
            post?.thumbnail || "../../static/img/no-image.svg"
          })`,
          backgroundSize: post?.thumbnail ? "cover" : "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="w-2/3 flex flex-col justify-between h-[79px]">
        <span className="font-light text-base leading-5 flex items-center text-blue-700 font-Din whitespace-nowrap overflow-clip">
          {post?.categories[0].name}
        </span>
        <h6 className="text-lg leading-5 flex text-gray-900 font-Din font-bold max-h-[2.4rem] overflow-clip">
          {post?.post_title && post.post_title}
        </h6>
        <span className="font-light text-sm leading-4 flex items-center text-[#33566C] font-Din mt-[2px]">
          {formatDate(post?.post_date)}
        </span>
      </div>
    </Link>
  );
}

export default SmallPostCard;
