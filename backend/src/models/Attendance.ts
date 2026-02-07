import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("attendance")
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  sessionId!: string; // ID للجلسة أو المحاضرة

  @Column()
  sessionName!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "studentId" })
  student!: User;

  @Column()
  studentId!: string;

  @CreateDateColumn()
  timestamp!: Date;
}
