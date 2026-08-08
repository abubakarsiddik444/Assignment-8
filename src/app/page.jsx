import Link from "next/link";
import AnimalCard from "@/components/animals/AnimalCard";
import { getFeaturedAnimals } from "@/utils/animals";

export default async function Home() {
  const featuredAnimals = await getFeaturedAnimals();

  return (
    <div className="space-y-8">
      <section className="grid gap-8 rounded-3xl border border-[#ded6c7]/80 bg-[#fffdf7]/80 p-4 shadow-sm sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div className="flex flex-col justify-center">
          <span className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">Bangladesh Qurbani haat</span>
          <h1 className="mb-4 text-3xl font-black leading-tight text-[#1f2520] sm:text-4xl lg:text-6xl">
            Book healthy cows and goats from trusted haat-bazar farms.
          </h1>
          <p className="mb-6 max-w-2xl text-base leading-8 text-[#647067] sm:text-lg">
            Compare breed, weight, district, and price before choosing your Qurbani animal from
            a modern digital haat.
          </p>

          <Link className="inline-flex w-full items-center justify-center rounded-lg border border-[#ded6c7] bg-[#1f6b4f] px-5 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 sm:w-fit" href="/animals">
            Browse Animals
          </Link>

        </div>
        <div className="overflow-hidden rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/90 shadow-[0_24px_70px_rgba(31,37,32,0.16)]">
          <img
            className="h-[360px] w-full object-cover lg:h-[520px]"
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Cattle%20Trading%20at%20Shahjahanpur%20Animal%20Market,%20Dhaka,%202024-06-15%20%28PID-0007870%29.jpg?width=1200"
            alt="Goru and chagol trading at Shahjahanpur animal haat, Dhaka, Bangladesh"
          />


          <div className="flex items-center justify-between border-t border-[#ded6c7] bg-[#fffdf7]/90 px-5 py-4">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#647067]">Ready listings</span>
            <strong className="text-2xl font-black text-[#1f6b4f]">6+</strong>
          </div>
        </div>
      </section>

      <section className="py-2 sm:py-4">
        <div className="mb-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">Featured</span>
          <h2 className="mt-2 text-2xl font-bold text-[#1f2520] sm:text-3xl">Hand-picked animals</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/80 p-5 py-6 shadow-sm sm:p-6 md:grid-cols-2 md:p-8">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">Qurbani tips</span>
          <h2 className="mt-2 text-2xl font-bold text-[#1f2520]">Inspect with confidence</h2>
          <ul className="mt-4 space-y-3 text-[#647067]">
            <li>Check clear eyes, active movement, and healthy appetite.</li>
            <li>Confirm age, weight, and farm feeding routine before booking.</li>
            <li>Choose an animal that fits both family need and budget.</li>
          </ul>
        </div>
        <div>


          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">Top breeds</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Local Deshi', 'Pabna', 'Red Chittagong', 'Black Bengal', 'Jamunapari', 'Beetal'].map((breed) => (
              <span key={breed} className="rounded-full border border-[#ded6c7] bg-white px-3 py-2 text-sm font-medium text-[#1f2520]">
                {breed}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
