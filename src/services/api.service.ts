const base_url = process.env.NEXT_PUBLIC_API_KEY as string
const api_key = process.env.NEXT_PUBLIC_API_DOMAIN as string
const public_domain = process.env.NEXT_PUBLIC_DOMAIN as string

export const API_REQUEST = {
  trending: `${base_url}/trending/all/week?api_key=${api_key}&language=en-US`,
  top_rated: `${base_url}/movie/top_rated?api_key=${api_key}&language=en-US`,
  tv_top_rated: `${base_url}/tv/top_rated?api_key=${api_key}&language=en-US`,
  upcoming: `${base_url}/movie/upcoming?api_key=${api_key}&language=en-US`,
  popular: `${base_url}/movie/popular?api_key=${api_key}&language=en-US`,
  comedy: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genres=35`,
  products: `${public_domain}/api/products`,
  subscription: `${public_domain}/api/subscription`,
}