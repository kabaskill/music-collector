import "./App.css";
import AlbumList from "./components/AlbumList";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";

function App() {
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = searched
        ? `https://neuefische-spotify-proxy.vercel.app/api/search?artist=${searchQuery}`
        : "https://neuefische-spotify-proxy.vercel.app/api/featured";

      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [searched, searchQuery]);

  function handleSearch(searchQuery) {
    setSearchQuery(searchQuery);
    setSearched(true);
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
          title={searched ? `Results for: ${searchQuery}` : "Featured"}
        />
      )}
    </div>
  );
}

export default App;
