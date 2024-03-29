import { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import Image from "next/image";
import { ScrollArea } from "./scroll-area";
import { Search as SearchIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface MainProps {
  language: "pt-br" | "en" | "es";
  setCurrentTrack: (track: Track | null) => void;
}

interface Album {
  cover: string;
  cover_big: string;
  cover_medium: string;
  cover_small: string;
  cover_xl: string;
  id: number;
  md5_image: string;
  title: string;
  tracklist: string;
  type: string;
}

interface Artist {
  id: number;
  name: string;
  picture: string;
  picture_big: string;
  picture_medium: string;
  picture_small: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

export interface Track {
  album: Album;
  artist: Artist;
  duration: number;
  explicit_content_cover: number;
  explicit_content_lyrics: number;
  explicit_lyrics: boolean;
  id: number;
  link: string;
  md5_image: string;
  preview: string;
  rank: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  type: string;
}

interface Response {
  data: Track[];
  next?: string;
  prev?: string;
  total: number;
}

const Search = ({ language, setCurrentTrack }: MainProps) => {
  const [search, setSearch] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [totalTracks, setTotalTracks] = useState<number>(0);
  const [searchPage, setSearchPage] = useState<number>(1);

  const fetchTracks = async (search: string, pageIndex: number) => {
    const itemsPerPage = 25;
    const startIndex = (pageIndex - 1) * itemsPerPage;
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}&index=${startIndex}&limit=${itemsPerPage}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "31ec012ed4mshcbc18c9468d26dbp1e4744jsnf4d52ee7f210",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    try {
      const res = await fetch(url, options);
      const data = (await res.json()) as Response;
      setTracks(data.data);
      setTotalTracks(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search.length > 0 && confirm) {
      fetchTracks(search, searchPage);
      setConfirm(false);
    }
  }, [search, confirm, searchPage]);

  return (
    <div className="flex flex-col gap-4 w-full h-[90%] px-2">
      <div className="flex flex-col gap-4 h-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchPage(1);
            setConfirm(true)
          }}
          className="w-full flex items-end gap-4"
        >
          <div className="flex flex-col gap-1 w-full lg:w-1/2 2xl:w-1/3">
            <label htmlFor="search" className="text-sm font-bold">
              {
                {
                  "pt-br": "Pesquisar",
                  en: "Search",
                  es: "Buscar",
                }[language]
              }
            </label>
            <Input
              type="text"
              id="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-950"
            />
          </div>
          <Button type="submit" className="w-10 p-0 m-0">
            <SearchIcon size={20} />
          </Button>
        </form>
        
        {tracks.length > 0 ? (
          <ScrollArea className="rounded-md scroll-smooth">
            <div className="flex flex-wrap px-[7%] sm:px-0 sm:justify-center gap-4">
              {tracks.map((track, index) => (
                <div
                  className="flex flex-col w-36 sm:w-40 lg:w-44 gap-2 cursor-pointer bg-zinc-200 bg-opacity-10 hover:bg-opacity-20 rounded-md transition-all"
                  key={index}
                  onClick={() => {
                    console.log(track);
                    setCurrentTrack(track);
                  }}
                >
                  <Image
                    src={track.album.cover_medium}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-md object-cover w-auto h-auto"
                    alt={track.album.title}
                  />
                  <div className="flex flex-col gap-4 p-2 pb-4">
                    <p className="text-base font-bold w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      {track.title}
                    </p>
                    <p className="text-xs font-bold w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      {track.artist.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Pagination>
              <PaginationContent className="pt-4 w-full flex ">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className={`${
                      searchPage === 1 && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (searchPage !== 1) {
                        fetchTracks(search, Math.max(searchPage - 1, 1));
                      }
                      setSearchPage((prev) => Math.max(prev - 1, 1));
                    }}
                  />
                </PaginationItem>

                {[...Array(Math.ceil(totalTracks / 25))].map((_, index) => {
                  const isFirstPage = index === 0;
                  const isSecondPage = index === 1;
                  const isLastPage = index === Math.ceil(totalTracks / 25) - 1;
                  const isSecondToLastPage =
                    index === Math.ceil(totalTracks / 25) - 2;

                  if (
                    isFirstPage ||
                    isSecondPage ||
                    isLastPage ||
                    isSecondToLastPage
                  ) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={() => {
                            fetchTracks(search, index + 1);
                            setSearchPage(index + 1);
                          }}
                          isActive={searchPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (index === 2) {
                    // Adicionar reticências após o segundo item
                    return (
                      <PaginationItem key={index}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return null; // Para os outros itens, não renderizar
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className={`${
                      searchPage === Math.ceil(totalTracks / 25) &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (searchPage !== Math.ceil(totalTracks / 25)) {
                        fetchTracks(
                          search,
                          searchPage < Math.ceil(totalTracks / 25)
                            ? searchPage + 1
                            : searchPage
                        );
                      }
                      setSearchPage((prev) =>
                        prev < Math.ceil(totalTracks / 25) ? prev + 1 : prev
                      );
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center text-zinc-400 justify-center gap-4 h-full">
            <p className="text-xl font-bold">
              {
                {
                  "pt-br": "Pesquise por uma música",
                  en: "Search for a song",
                  es: "Buscar una canción",
                }[language]
              }
            </p>
            <SearchIcon size={50} />
          </div>
        
        )}
      </div>
    </div>
  );
};

export default Search;
