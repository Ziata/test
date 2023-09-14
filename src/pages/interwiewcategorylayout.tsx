import FollowBlock from "@/components/FollowBlock/FollowBlock";
import PageSelect from "@/components/PageSelect/PageSelect";
import Pagination from "@/components/Pagination/Pagination";
import Post from "@/components/Post/Post";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import Tags from "@/components/Tags/Tags";

function InterwiewCategoryLayout() {
  return (
    <>
      <div
        className="w-full h-[200px] md:h-[330px] flex items-center justify-center"
        style={{
          backgroundImage: "url(../../static/img/interviewCategoryBanner.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="font-bold text-5xl text-white font-Din">
          Interviews With Scientists
        </h2>
      </div>
      <div className="container">
        <div className="md:p-[30px] bg-white md:-mt-[70px] flex w-full flex-col tb:flex-row">
          <div className="tb:mr-[30px] w-full">
            <Tags />
            <div className="mt-[20px] flex-col flex justify-between md:flex-row md:flex-wrap gap-x-[1%] gap-y-[30px] pb-[30px]">
              <Post isInterview={true} />
              <Post isInterview={true} />
              <Post isInterview={true} />
              <Post isInterview={true} />
              <Post isInterview={true} />
              <Post isInterview={true} />
              <Post isInterview={true} />
              <Post isInterview={true} />
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center ">
              <PageSelect />
              <Pagination />
            </div>
          </div>
          <div className="w-full flex flex-col-reverse md:flex-row justify-between tb:block tb:w-[360px] tb:min-w-[300px]">
            <div className="mt-[30px] tb:mt-[0]">
              <FollowBlock />
            </div>
            <div>
              <h6 className="font-light text-2xl leading-7 flex items-center text-[#002C47] font-Din mt-[30px] mb-[25px]">
                Recomend
              </h6>
              <SmallPostCard />
              <SmallPostCard />
              <SmallPostCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InterwiewCategoryLayout;
