import axios from 'axios'
const baseUrl = 'http://localhost:3003/'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config =  { headers: { Authorization: token},}
  const request = axios.get(baseUrl, config)
  
  return request.then(response => {console.log(request)
    return (response.data)})
}


const create = async newObject => {
  const config =  { headers: { Authorization: token},}
  const response = await axios.post( baseUrl, newObject, config)
  console.log(response)
  return response.data
}

const update = (id,newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }