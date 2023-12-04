import AlbumCard from "./AlbumCard";
import { useEffect, useState } from "react";

export default function AlbumList() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://neuefische-spotify-proxy.vercel.app/api/featured");
      const data = await response.json();

      setData(data);
    }

    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <AlbumCard
              artist={item.artist}
              title={item.title}
              year={item.release_date}
              image={item.image.url}
              tracks={item.tracks}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
