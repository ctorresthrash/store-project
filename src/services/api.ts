import { SESSION_STORAGE_KEY } from '@/constants'
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

export const getProducts = async (): Promise<Product[]> => {
    const token = window?.localStorage.getItem(SESSION_STORAGE_KEY);
    const parsedToken = JSON.parse(token || '{}') as Token;
    const { data } = await axios.get(`${BASE_URL}/products`, {
        headers: {
            Authorization: `Bearer ${parsedToken.access_token}`
        }
    })
    return data
}

export const getProduct = async (id: string): Promise<Product> => {
    const token = window?.localStorage.getItem(SESSION_STORAGE_KEY);
    const parsedToken = JSON.parse(token || '{}') as Token;
    const { data } = await axios.get(`${BASE_URL}/products/${id}`, {
        headers: {
            Authorization: `Bearer ${parsedToken.access_token}`
        }
    })
    return data
}