import { useState, useEffect } from "react";

export default function Objective({
  title,
  data,
}: {
  title: string;
  data: { title: string; text: string; image: string }[];
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update active every 5 seconds
      setActive((prevActive) => (prevActive + 1) % data.length);
      // Reset progress bar to 100 when changing the active element
      setProgress(100);
    }, 5000);

    // Clear intervals on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const updateProgressBar = () => {
    requestAnimationFrame(() => {
      setProgress((prevProgress) => Math.max(prevProgress - 100 / 5, 0));
    });
  };

  useEffect(() => {
    const progressBarUpdateInterval = setInterval(updateProgressBar, 100);

    return () => {
      clearInterval(progressBarUpdateInterval);
    };
  }, [active]);

  return (
    <div className="w-full  min-h-[730px] relative">
      <div className="absolute w-full h-full flex">
        <div className="w-[42%] h-full bg-[url(/images/prize/blur.png)] bg-cover bg-center"></div>
        <div
          className="w-[58%] h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${data[active].image}')` }}
        ></div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative py-[60px]">
        <h4 className="text-3xl text-[#FFF] max-w-[30%]">{title}</h4>
        <div className="flex flex-col">
          {data &&
            data.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setProgress(0);
                  setActive(i);
                }}
                className={`relative pl-[13px] mt-10 max-w-[30%] cursor-pointer ${
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
                      transition: `height ${progress === 100 ? 0 : 5}s linear`,
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
