import { minioClient, BUCKET_NAME } from "../config/minio";

export async function uploadSegment(
    streamId: string,
    segmentName: string,
    body: Buffer
) {
    const key = `streams/${streamId}/${segmentName}`;

    // Ensure the bucket exists
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
        await minioClient.makeBucket(BUCKET_NAME);
    }

    await minioClient.putObject(
        BUCKET_NAME,
        key,
        body,
        body.length,
        { 'Content-Type': 'video/mp2t' }
    );

    return key;
}
