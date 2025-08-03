import Link from "next/link";
import {IconType} from "react-icons";

interface SocialButtonProps{
    Icon:IconType;
    label: string;
    href:string;
    color?:string;
}

export default function SocialButtonProps ({Icon,label,href,color}:SocialButtonProps){
    return(
        <Link href={href} target="_blank">
            <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full border hover:scale-105 transition-all shadow-md ${color ?? "bg-white text-black hover:bg-gray-100"}`}
            >
                <Icon size={20} />
                <span className="font-mdeium">
                    {label}
                </span>

            </div>
        </Link>
    )
}