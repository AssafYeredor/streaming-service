
import './Navbar.css';

function Footer() {

  return (
      <footer className="status-footer">
        <div className="footer-right">
          <span className="status-dot green"></span> מערכת תקינה: 14 מצלמות פעילות
          <span className="footer-sep"></span>
          <span className="status-dot red"></span> 1 תקלות חומרה
        </div>
        <div className="footer-left">
          04/11/2023 14:32:15 UTC+2
        </div>
      </footer>
  );
}

export default Footer;
