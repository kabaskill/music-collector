import "./css/SearchBar.css";

export default function SearchBar({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const searchQuery = event.target.input.value;

    onSubmit(searchQuery);
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="input"
        id="input"
        className="form-input"
        type="text"
        placeholder="Which artist are you looking for?"
      />
      <button className="form-button" type="submit">
        🔍
      </button>
    </form>
  );
}
