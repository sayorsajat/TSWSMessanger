import { $authHost } from './index';

export const joinRoom = async (userId: number, roomId: string) => {
    const {data} = await $authHost.post('api/rooms', {userId, roomId})
    return data
}

export const loadRooms = async (userId: number) => {
    const {data} = await $authHost.get(`api/rooms/${userId}`)
    return data
}

export const loadMessages = async (roomId: string) => {
    const {data} = await $authHost.post('api/messages/findAll', {id: roomId})
    return data
}