import AlbumCard from "./AlbumCard";
import "./AlbumList.css";

export default function AlbumList({ data, title, className }) {
  return (
    <>
      <div className={className}>
        <h2 className="album-list-title">{title}</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{<AlbumCard data={item} />}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
