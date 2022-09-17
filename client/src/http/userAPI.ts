import { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import { $host, $authHost } from "./index";

export const registration = async (userName: string, password: string): Promise<AxiosResponse> => {
    const {data} = await $host.post('/auth/registration', {userName, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (userName: string, password: string): Promise<AxiosResponse> => {
    const {data} = await $host.post('/auth/login', {userName, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}