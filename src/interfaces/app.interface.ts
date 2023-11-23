export interface IMovie {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
  name: string
  original_title: string
  release_date: string
}

export interface Element {
  type: "Trailer" | "Featurette"
}

export interface Product {
  default_price: {
    id: string
    unit_amount: number
  }
  id: string
  images: string[]
  metadata: {
    adv: string
  }
  name: string
}

export interface Subscription {
  current_period_start: number
  current_period_end: number
  id: string
  plan: {
    amount: number
    active: boolean
    nickname: string
  }
  card: {
    brand: string
    last4: string
    exp_month: number,
    exp_year: number,
  }
  customer: {
    email: string
  }
}