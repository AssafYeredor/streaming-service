import "reflect-metadata";
import express from "express";
import segmentRoutes from "./routes/segments";
import { AppDataSource } from "./config/data-source";
import { startRTSPRecording } from "./services/recorder.service";

const app = express();
const PORT = 3000;

app.use(express.raw({ type: "*/*", limit: "50mb" }));

app.use("/segments", segmentRoutes);

AppDataSource.initialize().then(() => {
    console.log("Database connected successfully");

    // Start background RTSP recording
    const streamId = "camera1";
    const rtspUrl = process.env.RTSP_URL || "rtsp://localhost:8554/mystream";
    const myStreamUrl = "http://10.104.132.7:32023/camera1/index.m3u8";
    startRTSPRecording(streamId, myStreamUrl);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
    console.error("Error during Data Source initialization", err);
});