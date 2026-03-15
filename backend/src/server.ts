import express from "express";
import segmentRoutes from "./routes/segments";
import { AppDataSource } from "./config/data-source";
import hamalRoutes from "./routes/hamalRoutes";
import cameraRoutes from "./routes/cameraRoutes";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(
  "/segments",
  express.raw({ type: "*/*", limit: "50mb" }), // raw only for segments
  segmentRoutes
);

app.use("/segments", segmentRoutes);
app.use("/hamals", hamalRoutes);
app.use("/cameras", cameraRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed:", error);
  });