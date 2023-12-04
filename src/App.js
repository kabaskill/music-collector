import "./App.css";
import AlbumCard from "./components/AlbumCard";
import AlbumList from "./components/AlbumList";
import { data } from "./db";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">Music Gourmet</h1>
      <h2 className="App-header">Featured</h2>
      <AlbumList />
      <h2 className="App-header">Results</h2>
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

export default App;
