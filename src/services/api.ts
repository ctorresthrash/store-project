import axios from 'axios'
const BASE_URL = "https://api.escuelajs.co/api/v1"

type CreateUserParams = Omit<User, 'id'>

export const createUser = async (user: CreateUserParams): Promise<User> => {
    const { data } = await axios.post(`${BASE_URL}/users`, user)
    return data
}

type SessionParams = {
    email: string;
    password: string;
}

export const createSession = async (params: SessionParams): Promise<Token> => {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, params)
    return data
}

export const getProducts = async (token: string): Promise<Product[]> => {
    const { data } = await axios.get(`${BASE_URL}/products`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}