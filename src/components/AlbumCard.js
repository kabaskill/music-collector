import "./AlbumCard.css";

export default function Card({ artist, title, year, image, tracks }) {
  return (
    <>
      <section className="card-container">
        <section className="text-section">
          <h2>{title}</h2>
          <h3>{artist}</h3>
          <p>{year}</p>
        </section>
        <img className="album-cover" src={image} alt="album cover" />
      </section>
      {/* <section className="tracklist">
        <ul>
          {tracks.map((item) => (
            <li key={item.id}>
              `{item.number} {item.name} {item.duration}`
            </li>
          ))}
        </ul>
      </section> */}
    </>
  );
}
