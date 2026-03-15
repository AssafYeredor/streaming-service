import { useState, useEffect } from 'react';
import './GridCameras.css';
import VideoPlayer from './VideoPlayer';

function GridCameras() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/cameras`) 
      .then((res) => res.json())
      .then((data) => {
        setStreams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cameras:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
        {loading ? (
            <div>
            <div className="loading-spinner"></div>
            <span>טוען מצלמות...</span>
            </div>
        ) : (
            <div className="streams-grid">
            {streams.map((stream) => (
                <VideoPlayer
                key={stream.cameraId}
                streamName={stream.cameraName}
                serverUrl={import.meta.env.VITE_RMSP_SERVER_URL}
                />
            ))}
            </div>
        )}
    </div>
  );
}

export default GridCameras;
