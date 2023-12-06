import "./Divider.css";

export default function Divider({ onClick }) {
  return (
    <button
      type="click"
      aria-label="toggle track list"
      onClick={onClick}
      className="divider-button"
    >
      <span className="divider-button-text">v</span>
    </button>
  );
}
