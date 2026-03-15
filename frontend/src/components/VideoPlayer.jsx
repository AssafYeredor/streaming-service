import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import './VideoPlayer.css';

export default function VideoPlayer({ streamName, serverUrl }) {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const [status, setStatus] = useState('connecting');
    const containerRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const src = `${serverUrl}/${streamName}/index.m3u8`;

        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                liveSyncDurationCount: 1,
                liveMaxLatencyDurationCount: 3,
                liveDurationInfinity: true,
                highBufferWatchdogPeriod: 1,
            });

            hlsRef.current = hls;
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setStatus('live');
                video.play().catch(() => { });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    setStatus('error');
                    // Auto-retry after 3 seconds
                    setTimeout(() => {
                        setStatus('connecting');
                        hls.loadSource(src);
                    }, 3000);
                }
            });

            return () => {
                hls.destroy();
                hlsRef.current = null;
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Safari native HLS
            video.src = src;
            video.addEventListener('loadedmetadata', () => {
                setStatus('live');
                video.play().catch(() => { });
            });
        }
    }, [streamName, serverUrl]);

    return (
        <div className={`video-player`} ref={containerRef}>
            <div className="video-wrapper">
                <video ref={videoRef} muted autoPlay playsInline controls/>
                {status === 'connecting' && (
                    <div className="video-overlay">
                        <div className="spinner"></div>
                        <span>מתחבר לשידור...</span>
                    </div>
                )}
                {status === 'error' && (
                    <div className="video-overlay error">
                        <span className="error-icon">⚠</span>
                        <span>אין קליטה - מתחבר מחדש...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
