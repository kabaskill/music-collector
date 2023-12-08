import SearchBar from "./SearchBar";
import AlbumList from "./AlbumList";
import { useState, useEffect } from "react";

export default function Search({ baseURL, onSavedCheck, onToggleSave }) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  function handleSearch(searchQuery) {
    setSearchQuery(searchQuery);
  }

  useEffect(() => {
    async function fetchData() {
      if (searchQuery === "") {
        return;
      }

      const url = `${baseURL}search?artist=${searchQuery}`;

      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchQuery]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading ? (
        <h2>loading</h2>
      ) : (
        <AlbumList
          data={data}
          title={
            searchQuery !== "" ? `Results for: ${searchQuery}` : "Let's find some albums shall we?"
          }
          onToggleSave={onToggleSave}
          onSavedCheck={onSavedCheck}
        />
      )}
    </>
  );
}
