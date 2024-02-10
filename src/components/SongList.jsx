import "./css/SongList.css";

export default function SongList({ tracks, onToggleTrackSave, onTrackSavedCheck }) {
  return (
    <>
      <hr></hr>
      <ul className="track-list">
        {tracks.map((item) => (
          <li key={item.id}>
            <span className="text-number">{item.track_number}</span>
            <span className="text-title">{item.name}</span>
            <span className="text-duration">{item.duration}</span>

            <button
              className="track-list-button"
              type="button"
              onClick={() => onToggleTrackSave(item.id)}
            >
              {onTrackSavedCheck(item.id) ? "-" : "+"}
            </button>

            <button
              className="track-list-button"
              type="button"
              onClick={() => window.open(item.spotifyLink, "_blank", "noopener,noreferrer")}
            >
              ▶
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
