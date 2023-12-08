import "./App.css";

import Search from "./components/Search";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Saved from "./components/Saved";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import SongList from "./components/SongList";

function App() {
  const pages = {
    home: "HOME",
    search: "SEARCH",
    saved: "SAVED",
    tracks: "TRACKS",
  };
  const [activePage, setActivePage] = useState(pages.home);

  const baseURL = "https://neuefische-spotify-proxy.vercel.app/api/";

  const [savedAlbumIds, setSavedAlbumIds] = useLocalStorageState("Ids", { defaultValue: [] });
  const [savedAlbums, setSavedAlbums] = useLocalStorageState("Saved Albums", { defaultValue: [] });

  const [savedTrackIds, setSavedTrackIds] = useLocalStorageState("SavedTrackIds", {
    defaultValue: [],
  });
  const [savedTracks, setSavedTracks] = useLocalStorageState("SavedTracks", { defaultValue: [] });

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

  useEffect(() => {
    async function fetchSavedTracks() {
      if (savedTrackIds.length === 0) {
        setSavedTracks([]);
        return;
      }

      try {
        const savedURL = `${baseURL}tracks?ids=${JSON.stringify(savedTrackIds)}`;
        const response = await fetch(savedURL);
        const results = await response.json();
        setSavedTracks(results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSavedTracks();
  }, [savedTrackIds]);

  function saveTrackCheckHandler(id) {
    return savedTrackIds.includes(id);
  }

  function saveTrackHandler(id) {
    const isAlreadySaved = saveTrackCheckHandler(id);

    if (isAlreadySaved) {
      const updatedList = savedTrackIds.filter((savedId) => savedId !== id);
      setSavedTrackIds(updatedList);
    } else {
      const updatedList = [id, ...savedTrackIds];
      setSavedTrackIds(updatedList);
    }
  }

  return (
    <div className="app">
      <h1>
        <span className="span-for-spo">spo</span>
        <span className="span-for-t">t</span>iny
      </h1>
      {activePage === pages.home && (
        <Home
          baseURL={baseURL}
          onToggleSave={saveAlbumHandler}
          onSavedCheck={savedCheckHandler}
          onToggleTrackSave={saveTrackHandler}
          onTrackSavedCheck={saveTrackCheckHandler}
        />
      )}
      {activePage === pages.search && (
        <Search
          baseURL={baseURL}
          onToggleSave={saveAlbumHandler}
          onSavedCheck={savedCheckHandler}
          onToggleTrackSave={saveTrackHandler}
          onTrackSavedCheck={saveTrackCheckHandler}
        />
      )}
      {activePage === pages.saved && (
        <Saved
          data={savedAlbums}
          onToggleSave={saveAlbumHandler}
          onSavedCheck={savedCheckHandler}
          onToggleTrackSave={saveTrackHandler}
          onTrackSavedCheck={saveTrackCheckHandler}
        />
      )}
      {activePage === pages.tracks && (
        <>
          <h2>Saved Tracks</h2>
          <SongList
            tracks={savedTracks}
            onToggleTrackSave={saveTrackHandler}
            onTrackSavedCheck={saveTrackCheckHandler}
          />
        </>
      )}
      <Navbar activePage={activePage} pages={pages} onClick={setActivePage} />
    </div>
  );
}

export default App;
