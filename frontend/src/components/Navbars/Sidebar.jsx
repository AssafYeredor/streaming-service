
import './Navbar.css';


function RightNavbar() {

  return (
    <aside className="right-sidebar">
        <div className="sidebar-section-title">ניווט מהיר</div>
        <ul className="sidebar-menu">
        <li className="active">
            <span className="menu-icon">⊞</span>
            כל המצלמות
        </li>
        <li>
            <span className="menu-icon">📹</span>
            גדר צפונית
        </li>
        <li>
            <span className="menu-icon">📹</span>
            גדר מזרחית
        </li>
        <li>
            <span className="menu-icon">📹</span>
            גדר מערבית
        </li>
        </ul>
    </aside>
  );
}

export default RightNavbar;
