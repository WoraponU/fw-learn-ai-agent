import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 1000 * 10,
})

export const api = axiosInstance
