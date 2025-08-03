
type cardProps = {
    height: number;
    width: number;
    children?:React.ReactNode;
}

export default function Cards({height, width, children}: cardProps){
    return(
        <div className="bg-white rounded-2xl" style={{height: `${height}px`, width: `${width}px`}}>
            {children}   
        </div>
    )
}