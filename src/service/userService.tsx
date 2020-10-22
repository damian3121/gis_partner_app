import axios from 'axios';

export interface UserDetails {
    id: number,
    name: string,
    surname: string
}

const db: Array<UserDetails> = [
    {
        id: 1,
        name: "Damian",
        surname: "Mścisz"
    },
    {
        id: 2,
        name: "Jan",
        surname: "Kowalski"
    },
    {
        id: 3,
        name: "Michał",
        surname: "Kichał"
    }
]

export const userService = {
    async getAll(): Promise<Array<UserDetails>> {
        // const response = await axios.get<UserDetails[]>("")

        return db
    },

    async create(user: UserDetails): Promise<UserDetails> {
        // const response = await axios.post("", user)
        db.push(user)

        return user
    }
}