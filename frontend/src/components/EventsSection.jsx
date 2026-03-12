
import './EventsSection.css';

function EventsSection() {

  return (
    // <div className="app-container" dir="rtl">
        <div className="events-section">
              <div className="events-header">
                <div className="events-title">אירועים פתוחים</div>
                <div className="events-badge">3 אירועים בטיפול</div>
              </div>
              <div className="events-list">
                <div className="event-card">
                  <div className="event-icon danger-icon">⚠</div>
                  <div className="event-details">
                    <div className="event-name">זיהוי תנועה חריג</div>
                    <div className="event-meta">גדר צפונית • 14:28</div>
                  </div>
                  <button className="event-action">סגירת אירוע</button>
                </div>
                <div className="event-card">
                  <div className="event-icon warning-icon">🚪</div>
                  <div className="event-details">
                    <div className="event-name">פתיחת דלת מילוט</div>
                    <div className="event-meta">דלת מילוט 03 • 14:15</div>
                  </div>
                  <button className="event-action">סגירת אירוע</button>
                </div>
                <div className="event-card">
                  <div className="event-icon info-icon">👤</div>
                  <div className="event-details">
                    <div className="event-name">זיהוי פנים לא מוכר</div>
                    <div className="event-meta">לובי המתנה • 14:02</div>
                  </div>
                  <button className="event-action">סגירת אירוע</button>
                </div>
              </div>
            </div>
  );
}

export default EventsSection;
