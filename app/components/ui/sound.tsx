"use client"
import {cn} from "@/lib/utils"

interface SoundWaveProps{
    className?:string
    isPlaying?:boolean
    size?:"sm"|"md"|"lg"
}

export default function SoundWave ({className,isPlaying,size="md"}:SoundWaveProps){
    const sizeClasses={
        sm:"w-8 h-6",
        md:"w-12 h-8",
        lg:"w-16 h-12"
    }
    const barCount = 5
    const bars = Array.from({length:barCount},(_,i)=>i)

    return(
        <div className={cn("flex items-center justify-center overflow-hidden",sizeClasses[size],className)}>
            <div className="flex items-center justify-center gap-1 h-full w-full max-h-full">
                {bars.map((bar)=>(
                    <div
                    key={bar}
                    className={cn(
                        "bg-gray-400 rounded-full shadow-sm",
                        size === "sm" ? "w-1.5" : size === "md" ? "w-2" : "w-2.5",
                        isPlaying ? "animate-soundwave" : "opacity-40",
                        "transition-all duration-700"
                    )}
                    style={{
                        height: isPlaying
                          ? `${[55,75,95,75,55][bar]}%`
                          : "45%",
                        animationDelay: isPlaying ? `${bar * 0.15}s` : "0s",
                        animationDuration: isPlaying ? `1.3s` : "1.3s",
                        maxHeight: '92%'
                    }}
                    />
                ))}
            </div>

            <style jsx>{`
                @keyframes soundwave {
                  0%,100% { transform: scaleY(0.3); }
                  50% { transform: scaleY(1.2); }
                }
                .animate-soundwave {
                  animation: soundwave 1.3s cubic-bezier(.68,-0.55,.27,1.55) infinite;
                }
            `}</style>
        </div>
    )

}