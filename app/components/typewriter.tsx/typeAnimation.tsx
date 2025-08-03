"use client"
import React, { useEffect, useState } from "react";

type TypeAnimationProps = {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetweenWords?: number;
};

export default function TypeAnimation({words,typingSpeed,deletingSpeed,delayBetweenWords}:TypeAnimationProps){
    const [text,setText] = useState("");
    const [wordIndex,setWordIndex] = useState(0);
    const [isDeleting,setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex % words.length];
        let timer:NodeJS.Timeout;

        if(isDeleting){
            timer = setTimeout(() => {
                setText ((prev) => prev.slice(0,-1));
            },deletingSpeed);
        }else{
            timer = setTimeout(() => {
                setText ((prev) => currentWord.slice(0,prev.length + 1));
            },typingSpeed);
        }
        if(!isDeleting && text === currentWord){
            timer = setTimeout(() => {
                setIsDeleting(true),
                delayBetweenWords
            })
        }
        if(isDeleting && text === ""){
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }
        return () => clearTimeout(timer);
    },[text,isDeleting,wordIndex,words,typingSpeed,deletingSpeed,delayBetweenWords])

    return(
        <h1 className="text-5xl font-[monospace] text-black">
            {text}
            <span className="border-r-2 border-black animate-pulse ml-1"></span>
        </h1>
    )}
