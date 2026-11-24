import {Entity, Column, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, } from "typeorm"
import {User} from "../../users/entities/user.entity.js"

@Entity("roles")
export class Role {

        @PrimaryGeneratedColumn("uuid")
        id: string;
    
        @Column({unique:true})
        role_name: string;
    
        @Column({nullable:true})
        description?: string;
    
        @CreateDateColumn()
        creaate_at: Date;
    
        @ManyToMany(() => User, (user) => user.roles)
        users: User[];
}
