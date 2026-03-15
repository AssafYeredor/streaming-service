import express from "express";
import segmentRoutes from "./routes/segments";

const app = express();
const PORT = 3000;

app.use(express.raw({ type: "*/*", limit: "50mb" }));

app.use("/segments", segmentRoutes);

// AppDataSource.initialize().then(() => {
//     console.log("Database connected");
    
//     // הפעלה של ההקלטה ברקע
//     startRTSPRecording("camera_1", "rtsp://your_camera_url_here");
    
//     app.listen(3000, () => console.log("Server running"));
// }); 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});