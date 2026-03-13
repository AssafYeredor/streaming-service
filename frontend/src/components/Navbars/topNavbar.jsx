
import './Navbar.css';

function TopNavbar() {
  return (
      <header className="top-nav">
        <div className="nav-right">
          <div className="brand">
            <span className="brand-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </span>
            <span className="brand-name">זאב</span>
          </div>
          <nav className="nav-links">
            <a href="#" className="active">מסך בית</a>
            <a href="#">מסך VOD</a>
            <a href="#">מסך בקרה</a>
          </nav>
        </div>
      </header>
  );
}

export default TopNavbar;
