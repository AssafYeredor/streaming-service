import express from "express";
import segmentRoutes from "./routes/segments";

const app = express();
const PORT = 3000;

app.use(express.raw({ type: "*/*", limit: "50mb" }));

app.use("/segments", segmentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});