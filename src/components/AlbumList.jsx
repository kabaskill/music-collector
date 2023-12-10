import AlbumCard from "./AlbumCard";
import "./css/AlbumList.css";

export default function AlbumList({
  data,
  itemsOnPage,
  title,
  onToggleSave,
  onSavedCheck,
  onTrackSavedCheck,
  onToggleTrackSave,
}) {
  return (
    <>
      <h2 className="album-list-title">{title}</h2>
      <div className="album-list">
        <ul>
          {data.length > 0 &&
            data.map(
              (item, index) =>
                index < itemsOnPage && (
                  <li key={item.id}>
                    <AlbumCard
                      data={item}
                      isSaved={onSavedCheck(item.id)}
                      onToggleSave={() => onToggleSave(item.id)}
                      onToggleTrackSave={onToggleTrackSave}
                      onTrackSavedCheck={onTrackSavedCheck}
                    />
                  </li>
                )
            )}
        </ul>
      </div>
    </>
  );
}
