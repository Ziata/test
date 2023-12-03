import { useState, useEffect } from "react";
import Image from "next/future/image";

export default function Objective({
  title,
  data,
}: {
  title: string;
  data: { title: string; text: string; image: string }[];
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  let interval: NodeJS.Timeout;

  const startInterval = () => {
    interval = setInterval(() => {
      setProgress(0);
      setActive((prevActive) => (prevActive + 1) % data.length);
    }, 5000);
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
    <div className="w-full min-h-[730px] relative">
      <div className="hidden absolute w-full h-full md:flex flex-wrap">
        <div className="w-full md:w-[42%] min-h-[730px] bg-[url(/images/prize/blur.png)] bg-cover bg-center"></div>
        <div className="w-full md:w-[58%] h-full relative">
          <Image
            src={`${data[active].image}`}
            alt="tab-img"
            fill={true}
            className="object-cover"
          />
        </div>
      </div>
      <div className="bg-[url(/images/prize/blur.png)] bg-cover bg-center md:bg-none w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative py-[60px]">
        <h4 className="text-3xl text-[#FFF] w-full md:max-w-[30%]">{title}</h4>
        <div className="flex flex-col">
          {data &&
            data.map((item, i) => (
              <div
                key={i}
                onClick={() => handleClick(i)}
                className={`relative pl-[13px] mt-10 w-full md:max-w-[30%] cursor-pointer ${
                  active === i
                    ? "before:content-[''] before:h-full before:w-[1px] before:absolute before:bg-white opacity-100 before:left-0 before:top-0 before:transition-all before:duration-5000 before:opacity-50"
                    : "opacity-50"
                }`}
              >
                {active === i && (
                  <div
                    className={`h-full w-[1px] absolute bg-white left-0 top-0 transition-all duration-500`}
                    style={{
                      height: `${progress}%`,
                      transition: `height ${
                        progress === 100 ? 0 : 0.016
                      }s linear`, // 60 frames per second (1/60 = 0.016)
                    }}
                  />
                )}
                <div className="text-white text-xl">{item.title}</div>
                <div className="text-white text-[18px] mt-5">{item.text}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
