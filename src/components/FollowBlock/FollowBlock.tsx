import Image from "next/image";
import Link from "next/link";
import follow from "static/img/follow.png";
import { useRouter } from "next/router";
import { generateUniqueId } from "@/utils";
import { IFollow } from "@/services/interface";

function FollowBlock({ followData }: { followData: IFollow }) {
  const router = useRouter();

  return (
    <div className="bg-[#D0E5F2] flex flex-col tb:flex-col md:flex-row h-fit w-full py-[20px] px-[18px]">
      {router.pathname === `/[lang]` && (
        <div className="w-full md:w-1/2 mr-[30px] tb:mr-[0] tb:w-full h-auto mb-[30px] md:mb-[0] tb:mb-[18px]">
          <Image src={follow} alt="follow" />
        </div>
      )}
      <div
        className={`${
          router.pathname === "/" ? "md:w-1/2" : undefined
        } w-full  tb:w-full tb:h-full`}
      >
        <div className="flex flex-col justify-between bg-[#fff] p-[20px] gap-[18px] h-full">
          {followData && (
            <>
              <h4 className="font-light text-center text-2xl leading-7 text-gray-900 font-Din w-full">
                {followData.title_follow_next_question}
              </h4>
              {followData.social_media_list.map((link) => (
                <Link
                  key={generateUniqueId()}
                  href={link.url}
                  className="font-light text-sm leading-4 flex items-center font-Din text-[#33566C] pb-[20px] border-b-2 border-solid border-[#E5E5E5]"
                >
                  <Image
                    src={link.icon_image.url}
                    width={link.icon_image.width}
                    height={link.icon_image.height}
                    alt={link.social_name}
                    className="mr-[24px]"
                  />{" "}
                  {link.social_name}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowBlock;
