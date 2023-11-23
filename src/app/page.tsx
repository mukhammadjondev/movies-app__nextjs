import { cookies } from 'next/headers'
import { Header, Hero, Modal, Row, SubscriptionPlan } from "@/components";
import { IMovie, Product } from "@/interfaces/app.interface";
import { API_REQUEST } from "../services/api.service";

async function fetchData(apiEndpoint: string): Promise<IMovie[]> {
  const response = await fetch(apiEndpoint).then(res => res.json())
  return response.results
}

async function fetchProduct(apiEndpoint: string): Promise<Product[]> {
  const products = await fetch(apiEndpoint).then(res => res.json())
  return products.products.data
}

async function fetchSubscription(apiEndpoint: string): Promise<string[]> {
  const subscription = await fetch(apiEndpoint).then(res => res.json())
  return subscription.subscription.data
}

export default async function Home() {
  const cookieStore = cookies()
  const id = cookieStore.get('user_id')
  const [trending, topRated, tvTopRated, popular, comedy, upcoming, products, subscription] = await Promise.all([
    fetchData(API_REQUEST.trending),
    fetchData(API_REQUEST.top_rated),
    fetchData(API_REQUEST.tv_top_rated),
    fetchData(API_REQUEST.popular),
    fetchData(API_REQUEST.comedy),
    fetchData(API_REQUEST.upcoming),
    fetchProduct(API_REQUEST.products),
    fetchSubscription(`${API_REQUEST.subscription}/${id}`)
  ])
  if(!subscription.length) return <SubscriptionPlan products={products} />

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="relative pl-4 pb-16 lg:pl-16">
        <Hero trending={trending} />
        <section className="mt-[30vh]">
          <Row title='Top Rated' movies={topRated} />
          <Row title='Tv Show' movies={tvTopRated} isBig={true} />
          <Row title='Upcoming' movies={upcoming} isBig={true} />
          <Row title='Popular' movies={popular} />
          <Row title='Comedy' movies={[...comedy].reverse()} />
          <Row title='Trending' movies={trending} />
          <Row title='Family' movies={comedy} />
        </section>
      </main>
      <Modal />
    </div>
  )
}
