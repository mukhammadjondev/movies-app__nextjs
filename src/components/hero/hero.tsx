'use client'

import { IMovie } from "@/interfaces/app.interface"
import { HeroProps } from "./hero.props"
import { useEffect, useState } from 'react'
import Image from "next/image"
import { image_base } from "@/helpers/constants"
import { TbPlayerPlay } from 'react-icons/tb'
import ReactStars from "react-stars"
import { useInfoState } from "@/store"

const Hero = ({trending}: HeroProps): JSX.Element => {
  const [movie, setMovie] = useState<IMovie>({} as IMovie)
  const {setModal, setCurrentMovie} = useInfoState()

  const handleClick = () => {
    setCurrentMovie(movie)
    setModal(true)
  }

  useEffect(() => {
    const randomMovie = trending[Math.floor(Math.random() * trending.length)]
    setMovie(randomMovie)
  }, [trending])

  return (
    <div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[80vh] lg:pb-12 lg:justify-center">
      <div className="absolute -z-10 top-0 left-0 h-screen w-full">
        <Image src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`} alt={movie?.title || movie?.name} fill className="object-cover" />
      </div>

      <div className="py-[4px] px-[8px] text-center rounded-br-[8px] rounded-tl-[8px] bg-[#1d1d1d]/50 w-[111px] text-[#0FEFFD] uppercase">
        {movie.media_type}
      </div>

      <div className="flex items-center space-x-2">
        <ReactStars edit={false} count={10} value={movie.vote_average} color2={'#fff'} />
        <p>({movie.vote_count})</p>
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl text-shadow-md">{movie?.title || movie?.name || movie?.original_name}</h1>
      <p className="max-w-xs md:max-w-lg lg:max-w-2xl text-xs text-shadow-md md:text-lg lg:text-2xl">{movie?.overview?.slice(0, 100)}...</p>

      <div>
        <button className="flex justify-center items-center space-x-2 bg-white/50 hover:bg-white/80 transition-all font-bold text-black w-[200px] h-[56px] rounded-full" onClick={handleClick}>
          <TbPlayerPlay className="h-5 w-5 md:h-7 md:w-7" />Watch now
        </button>
      </div>
    </div>
  )
}

export default Hero