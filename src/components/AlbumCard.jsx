import "./css/AlbumCard.css";
import SongList from "./SongList";
import Divider from "./Divider";
import { useState } from "react";

export default function Card({ data, isSaved, onToggleSave }) {
  const [isHidden, setIsHidden] = useState(true);

  function onClickHandler() {
    setIsHidden(!isHidden);
  }

  return (
    <div className="card-container">
      <section className="card-info">
        <button
          type="button"
          aria-label="toggle track list"
          className="card-list-button-image"
          onClick={onClickHandler}
        >
          <img src={data.image.url} alt="album cover" />
        </button>
        <button type="button" className="save-button" onClick={onToggleSave}>
          {isSaved ? "Saved" : "Save"}
        </button>
        <aside className="card-text">
          <h2>{data.title}</h2>
          <h3>{data.artist}</h3>
          <p>{data.release_date.slice(0, 4)}</p>
        </aside>
      </section>
      <Divider onClick={onClickHandler} />
      {!isHidden && <SongList tracks={data.tracks} />}
    </div>
  );
}
