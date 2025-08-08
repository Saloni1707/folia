"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cards from "../cards";
import image from 'next/image';

interface ProjectProps {
    name: string;
    description: string;
    image: string;
    link?: string;
    github?: string;
}

// Sample projects data - replace with your actual projects
const projects: ProjectProps[] = [
    {
        name: "Sketchy",
        description: "Developed an Excalidraw-inspired whiteboard application using Next.js, React, TypeScript, and the Canvas API, enabling users to create, edit, and organize freehand sketches with an intuitive interface. Implemented smooth drawing tools, shape rendering, and responsive design using Tailwind CSS. .",
        image: "/lemons.png",
        link: "https://sketch-lemon.vercel.app/",
        github: "https://github.com/Saloni1707/sketch"
    },
    {
        name: "EasyPay",
        description: "This is a payment like application where users can pay for their products and services.",
        image: "/paytm.png",
        link: "https://easypay.vercel.app/",
        github: "https://github.com/Saloni1707/KoshFrontend"
    },
    {
        name: "FileOrganiser",
        description:"A powerful command-line tool to automatically organize your files with customizable rules. Organize your Downloads, Documents, or any folder with ease!",
        image: "/fileorganiser.png",
        github: "https://github.com/Saloni1707/file-organizer"
    }
    
];

export default function ProjectsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex >= projects.length ? 0 : nextIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const prev = prevIndex - 1;
            return prev < 0 ? projects.length - 1 : prev;
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
    };

    const project = projects[currentIndex];

    const variants = {
        enter: (direction: number) => ({
            x: direction >= 0 ? '100%' : '-100%',
            opacity: 0.5
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0.5
        })
    };

    const [direction, setDirection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const paginate = (newDirection: number) => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        setDirection(newDirection);
        
        if (newDirection > 0) {
            nextSlide();
        } else {
            prevSlide();
        }

        // Reset animation state after animation completes
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);
    };

    return (
        <div className="relative w-full h-full p-2">
            <div className="h-full flex flex-col">
                <div className="flex-1 min-h-0 flex flex-col">
                    <div className="flex-1 overflow-hidden rounded-lg mb-4 bg-gray-50 flex items-center justify-center p-2">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="w-full h-full flex items-center justify-center"
                                onAnimationComplete={() => {
                                    setDirection(0);
                                    setIsAnimating(false);
                                }}
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.name}
                                    className="max-w-full max-h-full object-contain"
                                    style={{
                                        maxHeight: '400px',
                                        width: 'auto',
                                        maxWidth: '100%',
                                        height: 'auto'
                                    }}
                                    onTransitionEnd={handleTransitionEnd}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <div className="p-4 pt-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${currentIndex}-text`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">{project.name}</h3>
                            <p className="text-gray-600 mb-4 min-h-[40px]">{project.description}</p>
                        </motion.div>
                    </AnimatePresence>
                    <div className="flex space-x-4 mt-4">
                        {project.link && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.link, '_blank');
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-black"
                            >
                                Link
                            </button>
                        )}
                        {project.github && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.github, '_blank');
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-black"
                            >
                                Code
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Navigation Arrows */}
            <motion.button 
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-600 hover:text-blue-600
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full"
                aria-label="Previous project"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </motion.button>
            <motion.button 
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-600 hover:text-blue-600
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full"
                aria-label="Next project"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </motion.button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-4 space-x-2">
                {projects.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

