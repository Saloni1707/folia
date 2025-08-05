import SocialButton  from "./ui/button";
import { FaGithub,FaTwitter,FaEnvelope} from "react-icons/fa";

export default function Reachme(){
    return(
        <div className="flex gap-4 flex-wrap justify-center">
            <SocialButton
                Icon={FaGithub}
                label=""
                href="https://github.com/Saloni1707"
            />
            <SocialButton
                Icon={FaTwitter}
                label=""
                href="https://x.com/saloni_who"
            />
            <SocialButton
                Icon={FaEnvelope}
                label=""
                href="mailto:saloni.talks.tech@gmail.com"
            />
        </div>
    )
}