import "./Divider.css";

export default function Divider({ onClick }) {
  return (
    <button aria-label="toggle track list" onClick={onClick} className="div-container">
      <div className="divider"></div>
      <span className="arrow">v</span>
    </button>
  );
}
