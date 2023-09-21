import FollowBlock from "@/components/FollowBlock/FollowBlock";
import Loader from "@/components/Loader/Loader";
import { useGetAboutQuery } from "@/services/api";

function About() {
  const currentLanguage = "en";
  const { data, isLoading } = useGetAboutQuery({ language: currentLanguage });

  return (
    <>
      {isLoading ? (
        <div className="flex w-full h-[70vh] items-center justify-center">
          <Loader customClass="w-[200px] h-[200px] mx-auto" />
        </div>
      ) : (
        data && (
          <>
            <div
              className="w-full h-[200px] md:h-[330px] flex items-center justify-center"
              style={{
                backgroundImage: `url(${data.featured_image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h2 className="md:-mt-[70px] font-bold text-5xl text-white font-Din">
                {data.title}
              </h2>
            </div>
            <div className="container">
              <div className="md:p-[30px] py-[20px] bg-white md:-mt-[70px] flex w-full flex-col tb:flex-row">
                <div
                  className="tb:mr-[30px] w-full font-light text-lg leading-6 font-Din text-[#363636] child:mt-2"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
                <div className="w-full flex flex-col-reverse md:flex-row justify-between tb:block tb:w-[360px] tb:min-w-[300px]">
                  <div className="mt-[30px] tb:mt-[0]">
                    <FollowBlock />
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

export default About;
