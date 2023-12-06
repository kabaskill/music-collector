import AlbumCard from "./AlbumCard";
import "./AlbumList.css";

export default function AlbumList({ data, title, className }) {
  return (
    <div className={className}>
      <h2 className="album-list-title">{title}</h2>
      <ul>
        {data.length > 0 && data.map((item) => <li key={item.id}>{<AlbumCard data={item} />}</li>)}
      </ul>
    </div>
  );
}
