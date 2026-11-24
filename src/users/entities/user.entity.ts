import {Entity, Column, ManyToMany, PrimaryGeneratedColumn, JoinTable, CreateDateColumn} from "typeorm"
import {Exclude} from "class-transformer"
import {Role} from "../../roles/entities/role.entity.js"

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
}
