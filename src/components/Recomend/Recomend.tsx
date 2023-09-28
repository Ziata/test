import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import { IPost } from "@/services/interface";
import { t } from "i18next";

function Recomend({ posts }: { posts: IPost[] }) {
  return (
    <div>
      <h6 className="font-light text-2xl leading-7 flex items-center text-[#002C47] font-Din mt-[30px] mb-[25px]">
        {t("Recomend")}
      </h6>
      {posts
        .sort(function (a, b) {
          return b.views - a.views;
        })
        .slice(0, 5)
        .map((post) => (
          <SmallPostCard key={post.ID} post={post} />
        ))}
    </div>
  );
}

export default Recomend;
