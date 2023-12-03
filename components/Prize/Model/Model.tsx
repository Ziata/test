import Item from "components/Prize/Model/Item/Item";
import { useState, useEffect } from "react";
import Image from "next/future/image";

export default function Model({
  title,
  data,
  isRight = false,
}: {
  title: string;
  data: { title: string; text: string; image: string }[];
  isRight?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  let interval: NodeJS.Timeout;

  const startInterval = () => {
    interval = setInterval(() => {
      setProgress(0);
      setActive((prevActive) => (prevActive + 1) % data.length);
    }, 6000);
  };

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval(interval);
    };
  }, [data, active]); // eslint-disable-line

  const updateProgressBar = () => {
    requestAnimationFrame(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + 100 / 5 / 240, 100); // Incrementally increase progress
        return newProgress;
      });
    });
  };

  useEffect(() => {
    const progressBarUpdateInterval = setInterval(updateProgressBar, 0);

    return () => {
      clearInterval(progressBarUpdateInterval);
    };
  }, [active]);

  const handleClick = (index: number) => {
    clearInterval(interval); // Clear the existing interval
    setProgress(0); // Reset progress to 0
    setActive(index); // Set the new active index
  };

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative  min-h-[490px] ${
        isRight
          ? "flex flex-col md:flex-row-reverse"
          : "flex flex-col md:flex-row"
      }`}
    >
      <div
        className={`py-6 md:py-[70px] ${
          isRight
            ? "md:pl-[30px] w-full md:w-[48%]"
            : "md:pr-[30px] mx-auto w-full md:w-[42%]"
        }`}
      >
        <h4 className="text-3xl text-[#002C47] mb-[10px] md:mb-[40px]">
          {title}
        </h4>
        <div className="flex flex-col relative">
          {data.map((item, i) => (
            <div key={i} onClick={() => handleClick(i)}>
              <Item data={item} active={active === i} />
              {active === i && (
                <div
                  className="h-[1px] bg-[#F05022] absolute"
                  style={{
                    width: `${progress}%`,
                    transition: `width ${progress === 100 ? 0 : 0.016}s linear`, // 60 frames per second (1/60 = 0.016)
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className={` flex items-center my-4 relative ${
          isRight
            ? "md:mr-[60px] w-full md:w-[52%]"
            : "md:ml-[60px] w-full md:w-[58%]"
        } `}
      >
        <Image
          src={`${data[active].image}`}
          alt="img"
          fill={true}
          className={`max-w-[520px] !relative !h-auto w-full rounded-xl ${
            isRight ? "" : "mx-auto"
          } `}
        />
      </div>
    </div>
  );
}
