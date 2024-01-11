import {
  Pause,
  PauseCircle,
  PlayCircle,
  PlusCircle,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { Slider } from "./slider";
import { Track } from "./search";
import { useEffect, useRef, useState } from "react";

interface FooterProps {
  setCurrentTrack: (track: Track | null) => void;
  currentTrack: Track | null;
}

const Footer = ({ currentTrack, setCurrentTrack }: FooterProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      console.log("audioRef.current is not defined");
    }
  };
  
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      console.log("audioRef.current is not defined");
    }
  }

  const setTimeToZero = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  const formatDurationToMinutes = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0);  
      });

      if (audioRef.current.currentTime === audioRef.current.duration) {
        setCurrentTime(0);
        setIsPlaying(false);
        pause();      }
    }
  }, [audioRef.current?.currentTime]);

  useEffect(() => {
    setTimeToZero();
    play();
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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
              className="md:hidden bg-transparent hover:bg-transparent cursor-pointer text-zinc-500 hover:text-zinc-300 transition-all"
            >
              {!isPlaying ?
              <button className="" onClick={() => {
                  if (currentTrack) {
                    play();
                  }
                }}>
                <PlayCircle
                  size={25}
                  className="text-zinc-400 hover:text-white"
                  />
              </button>
              : 
              <button className="" onClick={() => {
                if (currentTrack) {
                  pause();
                }
              }}>
              <PauseCircle
                size={25}
                className="text-zinc-400 hover:text-white"
              />
            </button>
            }
            </div>
          </div>
        </div>
          
        <div className="hidden flex-col items-center gap-2 md:flex absolute left-1/2 -translate-x-1/2">
          {currentTrack ? (
            <>
              <div className="flex items-center gap-6">
                <button onClick={() => {
                  setTimeToZero();
                }}>
                  <SkipBack size={20} className="text-zinc-400 hover:text-white" />
                </button>
                {!isPlaying ?
                  <button className="" onClick={() => {
                      if (currentTrack) {
                        play();
                      }
                    }}>
                    <PlayCircle
                      size={35}
                      className="text-zinc-400 hover:text-white"
                      />
                  </button>
                  : 
                  <button className="" onClick={() => {
                    if (currentTrack) {
                      pause();
                    }
                  }}>
                  <PauseCircle
                    size={35}
                    className="text-zinc-400 hover:text-white"
                  />
                </button>
                }
                <button>
                  <SkipForward
                    size={20}
                    className="text-zinc-400 hover:text-white"
                  />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">
                  {currentTime ? formatDuration(currentTime) : "0:00"}
                </span>
                <Slider
                  max={audioRef.current?.duration || 0}
                  min={0}
                  value={[currentTrack ? currentTime : 0]}
                  onValueChange={(value) => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = value[0];
                    }
                  }}
                  className="rounded-full w-[30rem] bg-zinc-600 cursor-pointer"
                />
                <span className="text-xs text-zinc-400">
                  {currentTrack ? formatDurationToMinutes(currentTrack.duration) : "0:00"}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-6">
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
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">
                  0:00
                </span>
                <Slider
                  max={1}
                  min={0}
                  value={[0]}
                  className="rounded-full w-[30rem] bg-zinc-600 cursor-pointer"
                />
                <span className="text-xs text-zinc-400">
                  0:00
                </span>
              </div>
            </>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex gap-2 items-center">
            <button className="text-zinc-400 hover:text-white transition-colors" onClick={() => {
              if (audioRef.current) {
                setVolume(0)
              }
            }}>
              {
                volume === 0 ?
                <VolumeX size={20} /> :
                volume < 0.5 ?
                <Volume1 size={20} /> :
                <Volume2 size={20} />
              }
            </button>
            <Slider
              max={1}
              min={0}
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              step={0.1}
              className="transform scale-75 rounded-full w-32 -mx-4 bg-zinc-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={currentTrack?.preview} />

    </footer>
  );
};

export default Footer;
