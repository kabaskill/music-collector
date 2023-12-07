import "./App.css";
import AlbumList from "./components/AlbumList";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const baseURL = "https://neuefische-spotify-proxy.vercel.app/api/";

  const [savedAlbumIds, setSavedAlbumIds] = useLocalStorageState("Ids", { defaultValue: [] });
  const [savedAlbums, setSavedAlbums] = useLocalStorageState("Saved Albums", { defaultValue: [] });

  useEffect(() => {
    async function fetchData() {
      const url =
        searchQuery !== "" ? `${baseURL}search?artist=${searchQuery}` : `${baseURL}featured`;

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

  useEffect(() => {
    async function fetchSavedAlbums() {
      if (savedAlbumIds.length === 0) {
        setSavedAlbums([]);
        return;
      }

      try {
        const savedURL = `${baseURL}albums?ids=${JSON.stringify(savedAlbumIds)}`;
        const response = await fetch(savedURL);
        const results = await response.json();
        setSavedAlbums(results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSavedAlbums();
  }, [savedAlbumIds]);

  function handleSearch(searchQuery) {
    setSearchQuery(searchQuery);
  }

  function savedCheckHandler(id) {
    return savedAlbumIds.includes(id);
  }

  function saveAlbumHandler(id) {
    const isAlreadySaved = savedCheckHandler(id);

    if (isAlreadySaved) {
      const updatedList = savedAlbumIds.filter((savedId) => savedId !== id);
      setSavedAlbumIds(updatedList);
    } else {
      const updatedList = [id, ...savedAlbumIds];
      setSavedAlbumIds(updatedList);
    }
  }

  console.log(savedAlbumIds);

  return (
    <div className="app">
      <h1>
        <span className="span-for-spo">spo</span>
        <span className="span-for-t">t</span>iny
      </h1>
      <SearchBar onSubmit={handleSearch} />
      {loading ? (
        <h2>loading</h2>
      ) : (
        <AlbumList
          data={data}
          title={searchQuery !== "" ? `Results for: ${searchQuery}` : "Featured"}
          onToggleSave={saveAlbumHandler}
          onSavedCheck={savedCheckHandler}
        />
      )}
      <AlbumList
        data={savedAlbums}
        title="Saved Albums"
        onToggleSave={saveAlbumHandler}
        onSavedCheck={savedCheckHandler}
      />
    </div>
  );
}

export default App;
