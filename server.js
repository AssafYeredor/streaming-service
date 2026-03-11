const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const streams = ['drone', 'fence', 'head'];

// יצירת תיקיות לכל זרם
streams.forEach(name => {
    const dir = path.join(__dirname, 'public', 'hls', name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // הרצת FFmpeg לכל מצלמה בנפרד
    ffmpeg(`rtsp://localhost:8554/${name}`)
        .outputOptions([
            '-c:v libx264', '-preset ultrafast', '-tune zerolatency', '-an',
            '-f hls', '-hls_time 1', '-hls_list_size 3', '-hls_flags delete_segments'
        ])
        .output(path.join(dir, 'index.m3u8'))
        .on('start', () => console.log(`Started processing stream: ${name}`))
        .on('error', (err) => console.log(`Error on ${name}: ${err.message}`))
        .run();
});

app.use(express.static('public'));
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));