import "./css/Navbar.css";

export default function NavbarButton({ page, onClick, activePage }) {
  function handleClick(param) {
    onClick(param);
  }

  return (
    <button
      type="button"
      onClick={() => handleClick(page)}
      className={`nav-button ${activePage ? "is-active" : ""}`}
    >
      {page.toLowerCase()}
    </button>
  );
}
