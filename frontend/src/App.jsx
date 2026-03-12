import { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import TopNavbar from './components/Navbars/topNavbar';
import './App.css';
import RightNavbar from './components/Navbars/RightNavbar';
import Footer from './components/Navbars/FooterNavbar';
import GridCameras from './components/GridCameras';
import EventsSection from './components/EventsSection';

const SERVER_URL = 'http://localhost:4000';

function App() {

  return (
    <div className="app-container" dir="rtl">
      <TopNavbar />

      <div className="main-layout">
        <RightNavbar />

          <div className="scrollable-content">
            <GridCameras />

            <EventsSection />
          </div>
      </div>

      <Footer/>
    </div>
  );
}

export default App;
