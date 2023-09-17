import { useRef } from "react";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="font-normal text-[18px] md:text-lg leading-0 text-white font-Din flex flex-row justify-center items-center bg-[#0071BC] w-full max-w-[230px] h-[60px] rounded-[50px] mt-[20px] md:mt-0 md:mr-[40px]">
      <audio ref={audioRef} src={src} />
      <button onClick={playAudio}>Play</button>
      <button onClick={pauseAudio}>Pause</button>
    </div>
  );
};

export default AudioPlayer;
