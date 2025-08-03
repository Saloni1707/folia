"use client"
import Cards from "./components/cards";
import TriangleCursor from "./components/trianglecursor/triangle";
import TypeAnimation from "./components/typewriter.tsx/typeAnimation";


export default function Home() {
  return (
    <>
    <TriangleCursor/>
      <div className="bg-[#9ECAD6] min-h-screen flex justify-center items-center">
        <Cards height={250} width={350}>
          <div className="flex flex-col justify-center items-center h-full w-full" >
            <TypeAnimation
              words={["Create", "Build", "Deploy"]}
              typingSpeed={180}
              deletingSpeed={270}
              delayBetweenWords={2700}
            />
          </div>
        </Cards>

        <div className="fixed bottom-10 right-15 z-50 cursor-hover-target" data-hover-text="My Playlist!">
          <img src="barcode.svg" alt="barcode" className="w-35 h-auto" />
        </div>
      </div>
    </>
  );
}
