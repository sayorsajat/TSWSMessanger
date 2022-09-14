import jwt_decode from "jwt-decode";
import { $host, $authHost } from "./index";

export const registration = async (userName: string, password: string) => {
    const {data} = await $host.post('api/auth/registration', {userName, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (userName: string, password: string) => {
    const {data} = await $host.post('api/auth/login', {userName, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}