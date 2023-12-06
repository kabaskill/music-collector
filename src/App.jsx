import "./App.css";
import AlbumList from "./components/AlbumList";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const baseURL = "https://neuefische-spotify-proxy.vercel.app/api/";
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

  function handleSearch(searchQuery) {
    setSearchQuery(searchQuery);
  }

  return (
    <div className="app">
      <h1>SpoTiny</h1>
      <SearchBar className="form-container" onSubmit={handleSearch} />
      {loading ? (
        <h2>loading</h2>
      ) : (
        <AlbumList
          className="album-list"
          data={data}
          title={searchQuery !== "" ? `Results for: ${searchQuery}` : "Featured"}
        />
      )}
    </div>
  );
}

export default App;
