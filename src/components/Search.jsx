import SearchBar from "./SearchBar";
import AlbumList from "./AlbumList";
import { useState, useEffect } from "react";

// import { localData } from "../db";

export default function Search({
  baseURL,
  onSavedCheck,
  onToggleSave,
  onTrackSavedCheck,
  onToggleTrackSave,
}) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const [itemsOnPage, setItemsOnPage] = useState(5);

  function handleSearch(searchQuery) {
    setSearchQuery(searchQuery);
  }

  function handleClick() {
    setItemsOnPage(itemsOnPage + itemsOnPage);
  }

  useEffect(() => {
    async function fetchData() {
      if (searchQuery === "") {
        return;
      }

      const url = `${baseURL}search?artist=${searchQuery}&offset=${itemsOnPage}`;

      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        // setData(localData);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchQuery]);

  console.log(data.length);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading ? (
        <h2>loading</h2>
      ) : (
        <AlbumList
          data={data}
          itemsOnPage={itemsOnPage}
          title={
            searchQuery !== "" ? `Results for: ${searchQuery}` : "Let's find some albums shall we?"
          }
          onToggleSave={onToggleSave}
          onSavedCheck={onSavedCheck}
          onTrackSavedCheck={onTrackSavedCheck}
          onToggleTrackSave={onToggleTrackSave}
        />
      )}
      {data.length > itemsOnPage && <button onClick={handleClick}>Gimme More ...</button>}
    </>
  );
}
