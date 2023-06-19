import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class History {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    procedure: string;

    @Column({ type: 'text', nullable: true })
    date: string;

    
}