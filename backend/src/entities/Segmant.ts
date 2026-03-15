import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn } from "typeorm";

@Entity({ name: "segments" }) // שם הטבלה בבסיס הנתונים
export class Segment {
    @PrimaryGeneratedColumn()
    id: number;

    @Index() // אינדקס לחיפוש מהיר לפי מצלמה
    @Column()
    cameraId: string;

    @Column()
    minioKey: string; // הנתיב המלא לקובץ בתוך ה-Bucket (למשל: streams/cam1/123.ts)

    @Index() // אינדקס קריטי לחיפוש טווחי זמן (DVR)
    @Column({ type: "timestamp with time zone" })
    startTime: Date;

    @Column({ type: "float" })
    duration: number; // אורך הסגמנט בשניות (למשל 1.0)

    @CreateDateColumn()
    createdAt: Date; // עמודה שנוצרת אוטומטית כשהשורה נשמרת - עוזר לדיבאג
}