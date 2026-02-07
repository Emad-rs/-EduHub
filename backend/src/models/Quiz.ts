import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  category!: string;

  @Column({ default: 30 }) // Duration in minutes
  duration!: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "creatorId" })
  creator!: User;

  @Column()
  creatorId!: string;

  @OneToMany(() => Question, (question) => question.quiz)
  questions!: Question[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  text!: string;

  @Column("simple-array")
  options!: string[];

  @Column()
  correctOption!: number; // Index of the correct option

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: "quizId" })
  quiz!: Quiz;

  @Column()
  quizId!: string;
}
