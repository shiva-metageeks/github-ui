import { useState } from "react";
import WavesurferPlayer from "@wavesurfer/react";

const AudioWave = ({ link }: { link: string }) => {
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <>
     <div className="border border-[#c4c4c4]  rounded-lg overflow-hidden p-1">
     <WavesurferPlayer
        height={100}
        waveColor="gray"
        url={link}
        onReady={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
     </div>

      <button className="bg-black text-white mx-auto py-2 px-3 rounded mt-4" onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </>
  );
};

export default AudioWave;