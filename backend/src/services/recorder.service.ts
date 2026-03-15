import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { uploadSegment } from './minio.service';
import { Segment } from '../entities/Segmant';
import { AppDataSource } from '../config/data-source';

export function startRTSPRecording(streamId: string, rtspUrl: string) {
    const tempDir = path.join(__dirname, '../../temp', streamId);

    // יצירת תיקייה זמנית למצלמה אם לא קיימת
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    ffmpeg(rtspUrl)
        // .inputOptions(['-rtsp_transport tcp']) // חיבור יציב יותר
        .outputOptions([
            '-f hls',               // פורמט של סגמנטים
            '-hls_time 1',          // כל קובץ יהיה שנייה אחת
            '-hls_list_size 3',     // שומר את כל הרשימה
            '-segment_format mpegts'
        ])
        .output(path.join(tempDir, 'playlist.m3u8'))
        .on('start', () => console.log(`Recording started for ${streamId}`))
        .on('error', (err) => console.error(`Error on ${streamId}:`, err))
        .run();

    // שלב 4 (המשך): האזנה לקבצים חדשים שנוצרים
    watchTempFolder(tempDir, streamId);
}

function watchTempFolder(dir: string, streamId: string) {
    fs.watch(dir, async (eventType, filename) => {
        // אנחנו מחפשים רק קבצי .ts (סגמנטים של וידאו)
        if (filename && filename.endsWith('.ts')) {
            const filePath = path.join(dir, filename);

            // Wait a short moment to ensure ffmpeg has finished writing the segment
            setTimeout(async () => {
                try {
                    // 1. Check if file exists before reading
                    if (!fs.existsSync(filePath)) return;

                    // 2. קריאת הקובץ מהדיסק
                    const fileBuffer = fs.readFileSync(filePath);

                    // 3. העלאה ל-Minio 
                    const key = await uploadSegment(streamId, filename, fileBuffer);

                    // 4. שמירה בפוסטגרס (לשימוש ב-DVR)
                    const segmentRepo = AppDataSource.getRepository(Segment);
                    await segmentRepo.save({
                        cameraId: streamId,
                        minioKey: key,
                        startTime: new Date(),
                        duration: 3 // matches -hls_time 1
                    });
                } catch (err) {
                    console.error(`Failed to process segment ${filename}:`, err);
                } finally {
                    // 5. מחיקת הקובץ מהתיקייה הזמנית בכל מקרה (כדי לא לסתום את הדיסק)
                    try {
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                    } catch (unlinkErr) {
                        console.error(`Failed to delete temp file ${filePath}:`, unlinkErr);
                    }
                }
            }, 500); // 500ms delay to allow writing to complete
        }
    });
}