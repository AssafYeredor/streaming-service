import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// enums
export enum CameraStatus {
  CONNECTED = "מחובר",
  DISCONNECTED = "מנותק",
  ERROR = "תקלה",
}

export enum CameraType {
  INFRARED = "אינפרה-אדום",
  RGB = "RGB",
  BLACK_WHITE = "שחור לבן",
}

@Entity()
export class Camera {

  @PrimaryGeneratedColumn({ name: "camera_id"})
  cameraId!: number;

  @Column({ name: "camera_name",type: "varchar", nullable: true })
  cameraName?: string;

  @Column({ name: "camera_num", type: "int" })
  cameraNum!: number; // המספר בתוך החמ"ל (0 = מוסתר)

  @Column({ type: "varchar", nullable: true })
  coordinate?: string; // optional coordinate

  @Column({
    name: "camera_status",
    type: "enum",
    enum: CameraStatus,
  })
  cameraStatus!: CameraStatus;

  @Column({
    name: "camera_type",
    type: "enum",
    enum: CameraType,
  })
  cameraType!: CameraType;
}