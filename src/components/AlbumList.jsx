import AlbumCard from "./AlbumCard";
import "./css/AlbumList.css";

export default function AlbumList({ data, itemsOnPage, title, onToggleSave, onSavedCheck }) {
  return (
    <div className="album-list">
      <h2 className="album-list-title">{title}</h2>
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
                  />
                </li>
              )
          )}
      </ul>
    </div>
  );
}
