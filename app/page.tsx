"use client"
import { Separator } from "./components/ui/separator";
import Cards from "./components/cards";
import Reachme from "./components/reachme";
import TriangleCursor from "./components/trianglecursor/triangle";
import TypeAnimation from "./components/typewriter.tsx/typeAnimation";
import SoundWave from "./components/ui/sound";

import React, { useState, useRef } from "react";
import ProjectsCarousel from "./components/Projects/projects";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <>
    <TriangleCursor/>
      <div className="bg-[#9ECAD6] min-h-screen flex justify-center items-center">
        {/* <Cards height={250} width={350}>
          <div className="flex flex-col justify-center items-center h-full w-full" >
            <TypeAnimation
              words={["Create", "Build", "Deploy"]}
              typingSpeed={180}
              deletingSpeed={270}
              delayBetweenWords={2700}
            />
          </div>
        </Cards> */}
        {/* doxx */}
        <div className="fixed top-10 right-15 mt-8">
            <Cards height={110} width={220}>
              <div className="flex flex-col items-center gap-2 w-full">
                <h3 className="text-lg font-[monospace] text-black mb-1 mt-1">Social Address</h3>
                <Separator orientation="horizontal"/>
                <Reachme/>
              </div>
            </Cards>
        </div>

        {/* //Main character energy */}

        <div className="w-full flex justify-center items-center min-h-screen">
          <div className="cursor-hover-target relative" data-hover-text="click to view projects">
            <Cards height={600} width={700}>
              <ProjectsCarousel />
            </Cards>
          </div>
        </div>
        
          
        {/* scrollbar */}
        <div className="fixed top-10 left-15">
          <Cards height={850} width={50}>
            <div className="flex flex-col items-center mt-4 mb-2">
              <button
                className="flex items-center justify-center rounded-full border-1 border-gray-00 w-9 h-9 bg-white shadow hover:bg-gray-100 transition-colors focus:outline-none mb-2 mt-2"
                onClick={() => {
                  setIsPlaying((prev: boolean) => {
                    const next = !prev;
                    if (audioRef.current) {
                      if (next) audioRef.current.play();
                      else audioRef.current.pause();
                    }
                    return next;
                  });
                }}
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                <SoundWave size="sm" isPlaying={isPlaying} />
                <audio
                  ref={audioRef}
                  src="/music.mp3"
                  preload="auto"
                  onEnded={() => setIsPlaying(false)}
                  style={{ display: "none" }}
                />
              </button>
            </div>
            {/* //Projects */}
            <div className="flex flex-col items-center justify-center h-full text-gray-800 text-lg font-[monospace] gap-x-4">
              <button className="transform -rotate-270 border border-gray-200 rounded-full w-25 h-8 mt-50" onClick={()=>{}}>
                PROJECTS
              </button>
              <button className="transform -rotate-270 border border-gray-200 rounded-full w-25 h-8 mt-24">
                BLOGS
              </button>
              <button className="transform -rotate-270 border border-gray-200 rounded-full w-25 h-8 mt-24">
                ME
              </button>
            </div>

          </Cards>

        </div>
        {/* //footer */}
        <div className="fixed bottom-10 right-15 z-50 cursor-hover-target" data-hover-text="My Playlist!">
          <img src="barcode.svg" alt="barcode" className="w-35 h-auto" />
        </div>
      </div>
    </>
  );
}
