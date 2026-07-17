import Link from "next/link";
import AnimalCard from "@/components/animals/AnimalCard";
import { getFeaturedAnimals } from "@/utils/animals";

export default async function Home() {
  const featuredAnimals = await getFeaturedAnimals();

  return (
    <>
      <section className="hero">
        <div className="hero-copy animate__animated animate__fadeInLeft">
          <span className="eyebrow">Bangladesh Qurbani haat</span>
          <h1>Book healthy cows and goats from trusted haat-bazar farms.</h1>
          <p>
            Compare breed, weight, district, and price before choosing your Qurbani animal from
            a modern digital haat.
          </p>
          <Link className="primary-button" href="/animals">
            Browse Animals
          </Link>
        </div>
        <div className="hero-panel animate__animated animate__fadeInRight">
          <img
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Cattle%20Trading%20at%20Shahjahanpur%20Animal%20Market,%20Dhaka,%202024-06-15%20%28PID-0007870%29.jpg?width=1200"
            alt="Goru and chagol trading at Shahjahanpur animal haat, Dhaka, Bangladesh"
          />
          <div className="hero-stat">
            <strong>6+</strong>
            <span>ready listings</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Featured</span>
          <h2>Hand-picked animals</h2>
        </div>
        <div className="animal-grid">
          {featuredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <span className="eyebrow">Qurbani tips</span>
          <h2>Inspect with confidence</h2>
          <ul className="clean-list">
            <li>Check clear eyes, active movement, and healthy appetite.</li>
            <li>Confirm age, weight, and farm feeding routine before booking.</li>
            <li>Choose an animal that fits both family need and budget.</li>
          </ul>
        </div>
        <div>
          <span className="eyebrow">Top breeds</span>
          <div className="breed-list">
            <span>Local Deshi</span>
            <span>Pabna</span>
            <span>Red Chittagong</span>
            <span>Black Bengal</span>
            <span>Jamunapari</span>
            <span>Beetal</span>
          </div>
        </div>
      </section>
    </>
  );
}
