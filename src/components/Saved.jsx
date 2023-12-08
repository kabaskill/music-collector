import AlbumList from "./AlbumList";

export default function Saved({ data, onToggleSave, onSavedCheck }) {
  const title = data.length > 0 ? "Saved" : "How about adding some albums?";

  return (
    <AlbumList
      data={data}
      itemsOnPage={data.length}
      title={title}
      onToggleSave={onToggleSave}
      onSavedCheck={onSavedCheck}
    />
  );
}
