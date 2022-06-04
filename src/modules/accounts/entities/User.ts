import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
class User {

    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    is_confirmed: boolean

    @Column()
    is_logged: boolean


}

export { User }