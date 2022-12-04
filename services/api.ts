import Axios from "axios"

export const BASE_URL_WEB = process.env.NODE_ENV === 'development' ? `http://localhost:3000/api/` : `https://slimeread.com/api/`
export const BASE_URL = ``;


export const APIClient = Axios.create({
  baseURL: BASE_URL_WEB,
  timeout: 10000,
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
  },
})

  
export const API = Axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
  },
})  