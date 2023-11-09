import Header from "@/components/header";
import { API_REQUEST } from "./services/api.service";

export default async function Home() {
  const trending = await fetch(API_REQUEST.trending).then(res => res.json())
  console.log(trending)

  return <div className="relative h-[200vh]">
      <Header />
      <main></main>
    </div>
}
