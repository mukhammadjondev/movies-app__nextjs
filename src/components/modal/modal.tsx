'use client'

import { useInfoState } from "@/store"
import MuiModal from "@mui/material/Modal"
import { useEffect, useState } from "react"
import { Element } from "@/interfaces/app.interface"
import ReactPlayer from "react-player"

const Modal = () => {
  const {currentMovie, modal, setModal} = useInfoState()
  const [trailer, setTrailer] = useState<string>('')
  const [muted, setMuted] = useState<boolean>(true)

  const base_url = process.env.NEXT_PUBLIC_API_KEY as string
  const api_key = process.env.NEXT_PUBLIC_API_DOMAIN as string

  const api = `${base_url}/${currentMovie?.media_type === 'tv' ? 'tv' : 'movie'}/${currentMovie.id}/videos?api_key=${api_key}&language=en-US`

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await fetch(api).then(res => res.json())

      if(data?.results) {
        const index = data.results.findIndex((el: Element) => el.type === 'Trailer')
        setTrailer(data?.results[index]?.key)
      }
    }

    fetchVideoData()
  }, [currentMovie])

  return modal ? (
    <MuiModal open={modal} onClose={() => setModal(false)} className='fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide mb-7'>
      <>
        <div className="relative pt-[50%]">
          <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer}`} width={'100%'} height={'100%'} playing muted={muted} style={{position: 'absolute', top: 0, left: 0}} controls />
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">{currentMovie!.vote_average * 10}% Match</p>
              <p className="font-light">{currentMovie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">HD</div>
            </div>

            <div className="flex flex-col gap-x-5 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Original language:</span> {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span> {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  ) : null
}

export default Modal