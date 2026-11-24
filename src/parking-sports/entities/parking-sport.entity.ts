import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "../../reservations/entities/reservation.entity.js";
import {User} from "../../users/entities/user.entity.js"

export class Charger_type {
    STANDARD = "STANDARD";

    FAST = "FAST";

    ULTRA_FAST = "ULTRA_FAST"

}

@Entity("parkingSports")
export class ParkingSport {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    code: string;

    @Column(
        {
            type: "enum",
            enum: Charger_type
        }
    )
    charger_type: string[]

    @OneToMany(() => Reservation, (reservations) => reservations.id_spot)
    @JoinColumn({name: "reservations"})
    reservations: number[];

    @ManyToOne(() => User, (user) => user.parkingSports)
    id_supervisor: string;

    @CreateDateColumn()
    create_at: Date;

}
