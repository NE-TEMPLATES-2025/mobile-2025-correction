import axios from "axios"
import storage from "../(onboarding)/storage"
export const server= {
    baseUrl: `https://67ac71475853dfff53dab929.mockapi.io/api/v1`
}

export const apiClient= axios.create({
    baseURL: server.baseUrl,
    headers:{
        "Content-Type":"application/json",
    }
})


export const protectedApiClient = axios.create({
    baseURL: "https://67ac71475853dfff53dab929.mockapi.io/api/v1",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${storage.getToken()}`,
    }
})

