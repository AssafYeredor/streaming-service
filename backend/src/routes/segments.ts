import { Router } from "express";
import { uploadSegment } from "../services/s3.service";

const router = Router();

router.post("/:streamId/:segment", async (req, res) => {
    try {
        const { streamId, segment } = req.params;

        const key = await uploadSegment(
            streamId,
            segment,
            req.body as Buffer
        );

        res.json({
            message: "segment uploaded",
            key
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("upload failed");
    }
});

export default router;