export const PostCardComponent = ({image}: { image: string }) => {
    return (
        <div className={"rounded-lg shadow-sm overflow-hidden"}>
            <img className={"w-full h-auto"} src={image} alt={""}></img>
        </div>
    )
}