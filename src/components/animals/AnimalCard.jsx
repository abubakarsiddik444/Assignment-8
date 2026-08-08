import Link from "next/link";

export default function AnimalCard({ animal }) {
  const title = animal.title || animal.name;

  return (

    <article className="overflow-hidden rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/90 shadow-sm">
      <img className="h-48 w-full object-cover" src={animal.image} alt={title} />

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">

          <span className="rounded-full bg-[#1f6b4f]/10 px-3 py-1 text-sm font-semibold text-[#1f6b4f]">{animal.category}</span>

          <strong className="text-lg font-bold text-[#1f2520]">৳{animal.price.toLocaleString()}</strong>
        </div>

        <h3 className="text-xl font-bold text-[#1f2520]">{title}</h3>

        <p className="text-sm text-[#647067]">{animal.breed} • {animal.weight} kg • {animal.location} • {animal.type}</p>

        <p className="text-sm leading-6 text-[#647067]">{animal.description}</p>

        <Link className="mt-1 inline-flex w-fit items-center justify-center rounded-lg border border-[#ded6c7] bg-[#1f6b4f] px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5" href={`/animals/${animal.id}`}>
          Details
        </Link>
      </div>
    </article>
  );
}
