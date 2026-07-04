import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ocean-tech-backend-production.up.railway.app/api'
})

export default api