import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column("text")
  description!: string;

  @Column()
  category!: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @Column({ nullable: true })
  pdfUrl?: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "uploaderId" })
  uploader!: User;

  @Column()
  uploaderId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
