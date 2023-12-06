import "./AlbumCard.css";
import SongList from "./SongList";
import Divider from "./Divider";
import { useState } from "react";

export default function Card({ data }) {
  const [isHidden, setIsHidden] = useState(true);
  const titleLengthLimit = 18;

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
        <aside className="card-text">
          <h2>
            {data.title.length > titleLengthLimit
              ? `${data.title.slice(0, titleLengthLimit)} ...`
              : data.title}
          </h2>
          <h3>{data.artist}</h3>
          <p>{data.release_date.slice(0, 4)}</p>
        </aside>
      </section>
      <Divider onClick={onClickHandler} />
      {!isHidden && <SongList tracks={data.tracks} />}
    </div>
  );
}
