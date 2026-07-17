import Link from "next/link";

export default function AnimalCard({ animal }) {
  const title = animal.title || animal.name;

  return (
    <article className="animal-card animate__animated animate__fadeInUp">
      <img src={animal.image} alt={title} />
      <div className="animal-card-body">
        <div className="card-row">
          <span className="pill">{animal.category}</span>
          <strong>৳{animal.price.toLocaleString()}</strong>
        </div>
        <h3>{title}</h3>
        <p>{animal.breed} • {animal.weight} kg • {animal.location} • {animal.type}</p>
        <p className="muted-text">{animal.description}</p>
        <Link className="details-link" href={`/animals/${animal.id}`}>
          Details
        </Link>
      </div>
    </article>
  );
}
