"use client"

import { useEffect, useState, useCallback } from "react"

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering,setIsHovering] = useState(false)
  const [hoverText,setHoverText] = useState<string | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
    setIsVisible(true)
    const target = e.target as HTMLElement
    const hoverTarget = target.closest(".cursor-hover-target")
    setIsHovering(hoverTarget !== null)
    setHoverText(hoverTarget?.getAttribute("data-hover-text") || null)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
    setIsHovering(false)
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  const width = isHovering?36:24;
  const height =isHovering?36:24;
  const color = isHovering?"#ff7f50":"#4a4a4a";

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        body { cursor: none !important; }
      `}</style>
      <svg
        width={width}
        height={height}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          transform: `translate(-2px, -2px)`, // Better alignment for cursor tip
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Classic arrow cursor shape matching the image */}
        <polygon points="0,0 0,16 6,12 16,12" fill={color} />
        {/* <polygon points="0,0 0,18 8,12 12,18" fill="#4a4a4a"/> */} 
      </svg>
      {isHovering && hoverText && (
        <div
        style={{
          position: "fixed",
          left: pos.x + 20,
          top: pos.y + 20,
          background: "#222",
          color: "#fff",
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "0.95rem",
          pointerEvents: "none",
          zIndex: 10000,
          whiteSpace: "nowrap"
        }}
      >
        {hoverText}
      </div>
      )}
    </>
  )
}

export default CustomCursor
