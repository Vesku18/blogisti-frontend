import axios from 'axios'
const baseUrl = 'http://localhost:3003/login'

const login = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  console.log("response", response)
  return response
}
export default { login }