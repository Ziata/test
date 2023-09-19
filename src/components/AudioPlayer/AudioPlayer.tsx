import { useEffect, useRef, useState } from "react";
import play from "../../../static/img/play.svg";
import pause from "../../../static/img/pause.svg";
import Image from "next/image";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playPauseHandler = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateTimeHandler = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTimeHandler);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", updateTimeHandler);
          audioRef.current.removeEventListener("ended", () =>
            setIsPlaying(false)
          );
        }
      };
    }
  }, []);

  return (
    <div className="w-full max-w-[330px] mx-[10px] h-[60px] bg-[#0071BC] rounded-[50px] flex items-center justify-evenly  px-[10px]">
      <audio ref={audioRef} src={src}></audio>
      <button className="w-[24px] h-[24px]" onClick={playPauseHandler}>
        <Image src={isPlaying ? pause : play} alt="button" />
      </button>
      <div className="flex items-center">
        <div className="mx-[5px] text-[#fff]">{formatTime(currentTime)}</div>
        <div className="flex items-center">
          <input
            type="range"
            className="w-full border-none h-[2px] bg-[#fff]"
            value={currentTime}
            max={duration || 1}
            onChange={handleSliderChange}
            onInput={handleSliderChange}
          />
        </div>
        <div className="mx-[5px] text-[#fff]">{formatTime(duration)}</div>
      </div>
    </div>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default AudioPlayer;
