import TopNavbar from './components/Navbars/TopNavbar';
import './App.css';
import RightNavbar from './components/Navbars/Sidebar';
import GridCameras from './components/GridCameras';

function App() {
  return (
    <div className="app-container" dir="rtl">
      <TopNavbar />

      <div className="main-layout">
        <RightNavbar />

          <div className="scrollable-content">
            <GridCameras />
          </div>
      </div>

    </div>
  );
}

export default App;
