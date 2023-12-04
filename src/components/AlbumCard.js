import "./AlbumCard.css";
import SongList from "./SongList";
import Divider from "./Divider";
import { useState } from "react";

export default function Card({ artist, title, year, image, tracks }) {
  const [isHidden, setIsHidden] = useState("hidden");

  function onClickHandler() {
    if (isHidden === "hidden") {
      setIsHidden("");
    } else {
      setIsHidden("hidden");
    }
    console.log(isHidden);
  }

  return (
    <>
      <section className="card-container">
        <section className="card-info">
          <section className="text-section">
            <h2>{title}</h2>
            <h3>{artist}</h3>
            <p>{year}</p>
          </section>
          <button aria-label="toggle track list" className="album-cover">
            <img src={image} alt="album cover" onClick={onClickHandler} />
          </button>
        </section>
        <Divider onClick={onClickHandler} />
        <SongList isHidden={isHidden} tracks={tracks} />
      </section>
    </>
  );
}
