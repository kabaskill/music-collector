import "./css/Navbar.css";
import NavbarButton from "./NavbarButton";

export default function Navbar({ onClick, pages, activePage }) {
  return (
    <nav className="nav-bar">
      <NavbarButton page={pages.home} onClick={onClick} activePage={activePage === pages.home} />
      <NavbarButton
        page={pages.search}
        onClick={onClick}
        activePage={activePage === pages.search}
      />
      <NavbarButton page={pages.saved} onClick={onClick} activePage={activePage === pages.saved} />
    </nav>
  );
}
