import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {User} from "../../users/entities/user.entity.js"
import { ParkingSport } from "../../parking-sports/entities/parking-sport.entity.js";


export class vehicle_max_charge{
    STANDARD = "STANDARD";

    FAST = "FAST";

    ULTRA_FAST = "ULTRA_FAST"

}

export class status{
    PENDING = "PENDING";

    COMPLETED = "COMPLETED";


}

@Entity("reservations")
export class Reservation {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.reservations)
    id_user: string;

    @ManyToOne(() => ParkingSport, (parking) => parking.reservations)
    id_spot: string;

    @Column()
    date: Date;

    @Column()
    vehicle_plate: string;

    @Column(
        {type: "enum",


        }
    )
    vehicle_max_charge: string[];

    @Column({
      type: "enum",
      enum: status,
      default: "PENDING"
    })
    status: string[];

    @CreateDateColumn()
    create_at: Date;



}

