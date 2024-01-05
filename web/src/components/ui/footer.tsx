import {
  PlayCircle,
  PlusCircle,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import { Slider } from "./slider";
import { Track } from "./main";

interface FooterProps {
  setCurrentTrack: (track: Track | null) => void;
  currentTrack: Track | null;
}

const Footer = ({ currentTrack, setCurrentTrack }: FooterProps) => {
  const formatDuration = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <footer className="bg-zinc-950 lg:bg-gradient-to-tl lg:from-[#0f1011] lg:to-[#0c0d0e] lg:rounded-lg lg:m-2 mt-0 z-30">
      <div className="mx-6 flex relative justify-between items-center h-20">
        <div className="flex gap-4 items-center justify-between w-full lg:w-auto">
          <div className="flex gap-4 items-center">
            <Image
              src={currentTrack?.album.cover_medium || "/placehold.jpg"}
              alt=""
              width={60}
              height={60}
              className="rounded-md"
            />
            <div>
              <p className="text-zinc-300 text-sm">
                {currentTrack?.title || "No song playing"}
              </p>
              <p className="text-zinc-400 text-xs">
                {currentTrack?.artist.name || "No artist"}
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <div
              //deve adicionar a música na playlist de favoritos do usuário
              className="bg-transparent hover:bg-transparent text-zinc-500 cursor-pointer hover:text-zinc-300 transition-all"
            >
              <PlusCircle size={25} />
            </div>

            <div
              //deve adicionar a música na playlist de favoritos do usuário
              className="md:hidden bg-transparent hover:bg-transparent cursor-pointer text-zinc-500 hover:text-zinc-300 transition-all"
            >
              <PlayCircle size={25} />
            </div>
          </div>
        </div>

        <div className="hidden flex-col items-center gap-2 md:flex absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-6">
            <button>
              <Shuffle size={20} className="text-zinc-400 hover:text-white" />
            </button>
            <button>
              <SkipBack size={20} className="text-zinc-400 hover:text-white" />
            </button>
            <button className="">
              <PlayCircle
                size={35}
                className="text-zinc-400 hover:text-white"
              />
            </button>
            <button>
              <SkipForward
                size={20}
                className="text-zinc-400 hover:text-white"
              />
            </button>
            <button>
              <Repeat size={20} className="text-zinc-400 hover:text-white" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">0:00</span>
            <Slider
              max={currentTrack?.duration}
              min={0}
              defaultValue={[0]}
              className="rounded-full w-[40rem] bg-zinc-600"
            />
            <span className="text-xs text-zinc-400">
              {currentTrack ? formatDuration(currentTrack.duration) : "0:00"}
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex gap-2 items-center">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Volume2 size={20} />
            </button>
            <Slider
              max={1}
              min={0.1}
              defaultValue={[0.5]}
              step={0.1}
              className="transform scale-75 rounded-full w-32 -mx-4 bg-zinc-600"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
