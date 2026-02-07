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

@Entity("activities")
export class Activity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  date!: string;

  @Column()
  location!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ default: "upcoming" }) // upcoming, ongoing, completed
  status!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "organizerId" })
  organizer!: User;

  @Column()
  organizerId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
