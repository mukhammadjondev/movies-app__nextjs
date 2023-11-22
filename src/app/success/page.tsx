import Image from "next/image"
import Link from "next/link"
import { FaCheckCircle } from "react-icons/fa"

const SuccessPage = () => {
  return (
    <>
      <div className="flex justify-start px-4 py-2">
        <Image src={'/logo.svg'} alt={'logo'} width={56} height={56} className={'cursor-pointer object-contain'} />
      </div>
      <div className="h-[88vh] flex flex-col justify-center items-center">
        <FaCheckCircle className="w-20 h-20 text-green-500" />
        <h1 className="text-2xl md:text-5xl mt-4">Subscription Completed</h1>
        <Link href={'/'}>
          <button className="mt-4 bg-green-500 py-4 px-5 rounded">Dashboard</button>
        </Link>
      </div>
    </>
  )
}

export default SuccessPage