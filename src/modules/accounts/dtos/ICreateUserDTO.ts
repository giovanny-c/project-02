
interface ICreateUserDTO {

    id?: string

    name: string

    email: string

    password: string

    is_confirmed?: boolean
}

export { ICreateUserDTO }