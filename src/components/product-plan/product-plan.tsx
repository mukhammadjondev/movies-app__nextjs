'use client'

import { AuthContext } from "@/context/auth.context"
import { NextResponse } from "next/server"
import { useContext, useState } from "react"
import { AiOutlineHourglass, AiOutlineVideoCameraAdd } from "react-icons/ai"
import { RiVipCrown2Line } from "react-icons/ri"
import { ProductPlanProps } from "./product-plan.props"

const ProductPlan = ({product}: ProductPlanProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {user} = useContext(AuthContext)

  const onSubmitSubscription = async (priceId: string) => {
    setIsLoading(true);
		const payload = { email: user?.email, priceId }

    try {
			const response = await fetch('/api/subscription', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			const data = await response.json()
			window.open(data.subscription.url)
			setIsLoading(false)
      return NextResponse.json(data)
		} catch (error) {
			setIsLoading(false)
      console.log(error)
		}
  }

  return (
    <div className="max-w-sm cursor-pointer bg-white/10 px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h3 className="mb-3 text-xl font-bold text-[#E10856]">{product.name}</h3>
      <div className="relative">
        <img src={product.images[0]} alt='Colors' className='rounded-xl w-full' />
        <p className="absolute top-0 bg-black/90 text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">{(product.default_price.unit_amount / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
        <div className="absolute rounded-xl top-0 left-0 bottom-0 right-0 w-full h-full bg-black/20" />
      </div>
      <div className="border-[1px] border-white/20 mt-4" />
      <button onClick={() => onSubmitSubscription(product.default_price.id)} className="w-full mt-4 py-4 rounded font-semibold bg-[#E10856]">
        BUY PLAN
      </button>
      <div className="my-4 flex flex-col space-y-2">
        {product.metadata.adv.split(', ').map((c, id) => (
          <div key={id} className="flex items-center space-x-2">
            {id === 0 && <RiVipCrown2Line className="w-5 h-5" />}
            {id === 1 && <AiOutlineHourglass className="w-5 h-5" />}
            {id === 2 && <AiOutlineVideoCameraAdd className="w-5 h-5" />}
            <p>{c}.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPlan