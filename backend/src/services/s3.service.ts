import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET_NAME } from "../config/s3";

export async function uploadSegment(
    streamId: string,
    segmentName: string,
    body: Buffer
) {
    const key = `streams/${streamId}/${segmentName}`;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: "video/mp2t"
    });

    await s3.send(command);

    return key;
}