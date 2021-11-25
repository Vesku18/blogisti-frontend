import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3003/api/blogs'

let token = null
const setToken = newToken => {
  token = (newToken) ? `bearer ${newToken}` : null
}

const getAll = async () => {
  const config =  { headers: { Authorization: token}}
  console.log("config:", config)
  const response = await axios.get(baseUrl, config)
  console.log(response.data)
  return response.data
  }


const create = async (newObject) => {
  const config =  { headers: { Authorization: token}}
  console.log("config addissä:", config)
  const response = await axios.post( baseUrl, newObject, config)
  console.log("status adistä", response.status)
  console.log("response", response.data)
  return response.data
}

const update = (id,newData) => {
  console.log("update alkaa")
  const config =  { headers: { Authorization: token }}
  const response = axios.put(`${baseUrl}/${id}`, newData, config)
  console.log("update done", response)
  return response.data
}

const deleteRecord = async (id) => {
  console.log("delete alkaa")
  const config =  { headers: { Authorization: token }}
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log("delete done", response.status)
  return response.status
}

export default { getAll, create, update, deleteRecord, setToken }