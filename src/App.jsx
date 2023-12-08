import "./App.css";

import Search from "./components/Search";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Saved from "./components/Saved";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const pages = {
    home: "HOME",
    search: "SEARCH",
    saved: "SAVED",
  };
  const [activePage, setActivePage] = useState(pages.home);

  const baseURL = "https://neuefische-spotify-proxy.vercel.app/api/";

  const [savedAlbumIds, setSavedAlbumIds] = useLocalStorageState("Ids", { defaultValue: [] });
  const [savedAlbums, setSavedAlbums] = useLocalStorageState("Saved Albums", { defaultValue: [] });

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
  }, [savedAlbumIds, setSavedAlbums]);

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

  return (
    <div className="app">
      <h1>
        <span className="span-for-spo">spo</span>
        <span className="span-for-t">t</span>iny
      </h1>
      {activePage === pages.home && (
        <Home baseURL={baseURL} onToggleSave={saveAlbumHandler} onSavedCheck={savedCheckHandler} />
      )}
      {activePage === pages.search && (
        <Search
          baseURL={baseURL}
          onToggleSave={saveAlbumHandler}
          onSavedCheck={savedCheckHandler}
        />
      )}
      {activePage === pages.saved && (
        <Saved
          data={savedAlbums}
          onToggleSave={saveAlbumHandler}
          onSavedCheck={savedCheckHandler}
        />
      )}
      <Navbar activePage={activePage} pages={pages} onClick={setActivePage} />
    </div>
  );
}

export default App;
