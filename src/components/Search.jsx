import SearchBar from "./SearchBar";
import AlbumList from "./AlbumList";
import { useState, useEffect } from "react";

export default function Search() {
  const [loading, setLoading] = useState(false);

  return (
    <>
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
    </>
  );
}
