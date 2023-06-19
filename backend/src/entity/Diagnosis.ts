import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Diagnosis {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    
}