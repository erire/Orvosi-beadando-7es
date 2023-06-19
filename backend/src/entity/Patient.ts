import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { History } from './History';
import { Diagnosis } from './Diagnosis';

@Entity()
export class Patient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text', nullable: true })
    dateofbirth: string;

    @Column()
    socialsecuritynumber: number;

    @Column({ type: 'text' })
    gender: string;

    @ManyToMany(() => History, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinTable()
    histories: History[];

    @ManyToMany(() => Diagnosis, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinTable()
    diagnoses: Diagnosis[];
    
    
}