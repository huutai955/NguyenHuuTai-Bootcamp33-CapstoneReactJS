import axios from 'axios';

export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMyIsIkhldEhhblN0cmluZyI6IjA4LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MDkxMjAwMDAwMCIsIm5iZiI6MTY1Mjg5MzIwMCwiZXhwIjoxNjgxMDU5NjAwfQ.YWfEjzumDyUA3XRRvMIkDiD1cOGgRKyAAeOTP3qTT2c'



export const http = axios.create({
    baseURL: 'https://shop.cyberlearn.vn/',
    timeout: 30000 // 
})


// Cấu hình cho request 
 http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        TOKEN_CYBERSOFT 
    } 
 }, (err) => {
    console.log(err)
    return Promise.reject(err)
 })

// Cấu hình cho response