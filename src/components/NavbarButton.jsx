import "./css/Navbar.css";

export default function NavbarButton({ page, onClick, activePage }) {
  function handleClick() {
    onClick(page);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`nav-button ${activePage ? "is-active" : ""}`}
    >
      {page.toLowerCase()}
    </button>
  );
}
