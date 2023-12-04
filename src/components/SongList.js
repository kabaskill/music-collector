import "./SongList.css";

export default function SongList({ isHidden, tracks }) {
  return (
    <div className={isHidden}>
      <ul className="track-list">
        {tracks.map((item) => (
          <li key={item.id}>
            <span className="text-number">{item.track_number}</span>
            <span className="text-title">{item.name} </span>
            <span className="text-duration">{item.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
