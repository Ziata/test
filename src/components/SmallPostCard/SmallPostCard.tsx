import { IPost } from "@/services/interface";
import { findFirstCategory, formatDate } from "@/utils";
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
  const currentLanguage = router.query.lang as string;

  return (
    <Link
      href={`/${router.query.lang}/post/${post.post_name}`}
      className={`flex cursor-pointer group relative ${
        isHiddenLine
          ? ""
          : "border-b-2 border-solid border-[#E5E5E5] pb-3 mb-3 md:pb-5 md:mb-5 "
      }`}
    >
      <div
        className={`w-1/3 mr-[15px] group-hover:scale-[1.1] transition-all duration-300`}
        style={{
          backgroundImage: `url(${
            post?.thumbnail || "../../static/img/no-image.svg"
          })`,
          backgroundSize: post?.thumbnail ? "cover" : "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="w-2/3 flex flex-col justify-between h-[80px]">
        <span
          className={`${
            post?.categories.some((obj) => obj.cat_ID === 2)
              ? "text-orange-600"
              : ""
          } h-[18px] font-light leading-[0.8] text-base flex items-center text-[#0071BC] font-Din whitespace-nowrap overflow-clip`}
        >
          {findFirstCategory(post.categories)}
        </span>
        <h6
          className="text-[17px] leading-5 flex text-[#002c47] transition-all duration-300 font-Din font-bold overflow-clip"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post?.post_title && post.post_title}
        </h6>
        <span className="font-light text-sm leading-[0.8] flex items-center text-[#33566c] font-Din">
          {formatDate(post?.post_date, currentLanguage)}
        </span>
      </div>
    </Link>
  );
}

export default SmallPostCard;
