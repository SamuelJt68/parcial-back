import {Entity, Column, ManyToMany, PrimaryGeneratedColumn, JoinTable, CreateDateColumn, OneToMany, JoinColumn} from "typeorm"
import {Exclude} from "class-transformer"
import {Role} from "../../roles/entities/role.entity.js"
import { ParkingSport } from "../../parking-sports/entities/parking-sport.entity.js";
import { Reservation } from "../../reservations/entities/reservation.entity.js";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Exclude() // No devuelve el hash
    @Column()
    password: string;

    @Column()
    name: string;

    @Column({nullable:true})
    phone?: string;

    @Column({default: true})
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
            name: 'users_roles',
            joinColumn: { name: 'user_id', referencedColumnName: 'id' },
            inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    roles: Role[]

    @OneToMany(() => ParkingSport, (parking) => parking.id_supervisor)
    @JoinColumn({name: "parkingSports"})
    parkingSports: string[];

    @OneToMany(() => Reservation, (reservation) => reservation.id_user)
    @JoinColumn({name: "reservations"})
    reservations: string[]
}
