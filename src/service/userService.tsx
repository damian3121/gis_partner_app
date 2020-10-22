import axios from 'axios';

export interface User {
    name: string,
    surname: string,
    email: string
}

export interface UserDetails extends User {
    id: number
}

const db: Array<UserDetails> = [
    {
        id: 1,
        name: "Damian",
        surname: "Mścisz",
        email: "d.m@gmail.com"
    },
    {
        id: 2,
        name: "Jan",
        surname: "Kowalski",
        email: "d.m@gmail.com"
    },
    {
        id: 3,
        name: "Michał",
        surname: "Kichał",
        email: "d.m@gmail.com"
    }
]

export const userService = {
    async getAll(): Promise<Array<UserDetails>> {
        // const response = await axios.get<UserDetails[]>("")

        return db
    },

    async create(user: User): Promise<UserDetails> {
        // const response = await axios.post("", user)
        const localCurrentMaxId = Math.max.apply(Math, db.map(function (o) { return o.id; }))
        db.push({
            id: localCurrentMaxId + 1,
            name: user.name,
            surname: user.surname,
            email: user.email
        })

        return {
            id: localCurrentMaxId + 1,
            name: user.name,
            surname: user.surname,
            email: user.email
        }
    }


}