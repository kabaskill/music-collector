import AlbumList from "./AlbumList";
import { useState, useEffect } from "react";

export default function Home({
  baseURL,
  onToggleSave,
  onSavedCheck,
  onTrackSavedCheck,
  onToggleTrackSave,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = `${baseURL}featured`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (

    <AlbumList
      data={data}
      itemsOnPage={data.length}
      title="Featured"
      onToggleSave={onToggleSave}
      onSavedCheck={onSavedCheck}
      onTrackSavedCheck={onTrackSavedCheck}
      onToggleTrackSave={onToggleTrackSave}

    />

  );
}
