import { image_base } from "@/helpers/constants"
import Image from "next/image"
import ReactStars from "react-stars"
import { ThumbnailProps } from "./thumbnail.props"

const Thumbnail = ({movie, isBig = false}: ThumbnailProps) => {
  return (
    <div className={`relative ${isBig ? 'h-[400px] md:h-[550px] min-w-[320px] md:min-w-[430px]' : 'h-[330px] md:h-[440px] min-w-[200px] md:min-w-[292px]'}  cursor-pointer transition duration-200 ease-out md:hover:scale-105`}>
      <Image src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`} alt={movie?.title || movie?.name} fill className="rounded-sm md:rounded object-cover" />
      <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/40" />

      <div className="absolute bottom-5 left-4">
        <div className="flex items-center space-x-2">
          <ReactStars edit={false} count={10} value={movie.vote_average} color2={'#fff'} />
          <p>({movie.vote_count})</p>
        </div>
        <h1 className="text-xl font-bold md:text-2xl">{movie?.title || movie?.name}</h1>
      </div>
    </div>
  )
}

export default Thumbnail