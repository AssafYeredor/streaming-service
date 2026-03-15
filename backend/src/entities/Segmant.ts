import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn } from "typeorm";

@Entity({ name: "segments" })
export class Segment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index()
    @Column({ type: "varchar" }) // הוספת סוג מפורשת מונעת את השגיאה שראית
    cameraId!: string;

    @Column({ type: "varchar" }) // הוספת סוג מפורשת
    minioKey!: string;

    @Index()
    @Column({ type: "timestamp with time zone" })
    startTime!: Date;

    @Column({ type: "float" })
    duration!: number;

    @CreateDateColumn()
    createdAt!: Date;
}