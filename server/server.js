const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Set fluent-ffmpeg to use the static binary
ffmpeg.setFfmpegPath(ffmpegInstaller);

const app = express();
const port = 4000;

// Allow the React frontend (on port 5173) to access HLS segments
app.use(cors());

const streams = ['drone', 'fence', 'head'];

// Create directories for each stream
streams.forEach(name => {
    const dir = path.join(__dirname, '../public/hls', name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Run FFmpeg for each camera (Commented out temporarily to preserve mock data from the static HLS files)
    // ffmpeg(`rtsp://localhost:8554/${name}`)
    //     .outputOptions([
    //         '-c:v libx264', '-preset ultrafast', '-tune zerolatency', '-an',
    //         '-f hls', '-hls_time 1', '-hls_list_size 3', '-hls_flags delete_segments'
    //     ])
    //     .output(path.join(dir, 'index.m3u8'))
    //     .on('start', () => console.log(`Started processing stream: ${name}`))
    //     .on('stderr', function (stderrLine) {
    //         // console.log(`[FFmpeg ${name}]: ${stderrLine}`);
    //     })
    //     .on('error', (err) => console.log(`Error on ${name}: ${err.message}`))
    //     .run();
});

// Serve the HLS segments as static files from the old public directory
app.use('/hls', express.static(path.join(__dirname, '../public/hls')));

// API endpoint to list available streams
app.get('/api/streams', (req, res) => {
    res.json({ streams });
});

app.listen(port, () => console.log(`RTSP/HLS Server running at http://localhost:${port}`));
