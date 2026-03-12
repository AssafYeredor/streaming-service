import { useState, useEffect } from 'react';
import './GridCameras.css';
import VideoPlayer from './VideoPlayer';

const SERVER_URL = 'http://localhost:4000';

function GridCameras() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch available streams from the server
    fetch(`${SERVER_URL}/api/streams`)
      .then(res => res.json())
      .then(data => {
        setStreams(data.streams);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to default streams if server is unreachable
        setStreams(['drone', 'fence', 'head']);
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
                key={stream}
                streamName={stream}
                serverUrl={SERVER_URL}
                />
            ))}
            </div>
        )}
    </div>
  );
}

export default GridCameras;
