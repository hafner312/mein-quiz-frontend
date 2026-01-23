import { Link, Outlet } from "react-router-dom";
import Navigation from "./navigation";

const Layout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-bar">
          <img
            src="/logo.png"
            className="App-logo"
            alt="Lern- und Schulnotizen Logo"
          />
          <Navigation />
        </div>
      </header>

      <main className="layout-main-content">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <div className="layout-footer-content">
          <div className="layout-footer-brand">
            <p>© {currentYear} Lern- und Schulnotizen · Bildungsplattform</p>
          </div>
          <div className="layout-footer-links">
            <Link to="/blabli">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
            <Link to="/agb">AGB</Link>
            <Link to="/kontakt">Kontakt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
