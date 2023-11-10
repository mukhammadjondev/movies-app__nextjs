import { Header, Hero } from "@/components";
import { IMovie } from "@/interfaces/app.interface";
import { API_REQUEST } from "../services/api.service";

export default async function Home() {
  const res = await fetch(API_REQUEST.trending).then(res => res.json())
  const trending: IMovie[] = res.results

  return <div className="relative h-[200vh]">
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Hero trending={trending} />
      </main>
    </div>
}
