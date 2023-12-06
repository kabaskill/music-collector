import "./AlbumCard.css";
import SongList from "./SongList";
import Divider from "./Divider";
import { useState } from "react";

export default function Card({ data }) {
  const [isHidden, setIsHidden] = useState(true);

  function onClickHandler() {
    setIsHidden(!isHidden);
  }

  return (
    <>
      <div className="card-container">
        <section className="card-info">
          <button
            type="click"
            aria-label="toggle track list"
            className="card-list-button-image"
            onClick={onClickHandler}
          >
            <img src={data.image.url} alt="album cover" />
          </button>
          <aside className="card-text">
            <h2>{data.title.length > 24 ? `${data.title.slice(0, 21)} ...` : data.title}</h2>
            <h3>{data.artist}</h3>
            <p>{data.release_date.slice(0, 4)}</p>
          </aside>
        </section>
        <Divider onClick={onClickHandler} />
        {isHidden === false && <SongList tracks={data.tracks} />}
      </div>
    </>
  );
}
