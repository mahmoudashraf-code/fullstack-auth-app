import { Entity, ObjectIdColumn, Column, ObjectId, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
