import { Link, Outlet } from "react-router-dom";
import Navigation from "./navigation";

const Layout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <img src="/vite.svg" className="App-logo" alt="logo" />
        <h1>Willkommen beim WISS-Quiz!</h1>
      </header>

      <main className="layout-main-content">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <div className="layout-footer-content">
          <div className="layout-footer-brand">
            <p>© {currentYear} WISS-Quiz. All rights reserved.</p>
            <p>Made with ❤️ by WISS</p>
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
