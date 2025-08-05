import Cards from "../cards";

interface Project{
    name: string;
    description:string;
    image:string;
    link?:string;
    github?:string
}

export default function Project({name,description,image,link,github}:Project){
    return(
        <div>
            <Cards height={250} width={350}>
                <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <img src={image} alt="" />
                    <div>
                        <button onClick={()=>{window.open(link)}}>link</button>
                        <button onClick={()=>{window.open(github)}}>Code</button>
                    </div>
                </div>
            </Cards>
        </div>
    )
}