import React, {useState} from 'react'

const LoginForm = ({ handleLogin }) => { 

      const [username, setUsername] = useState('')
      const[password, setPassword] = useState('')
      const handleSubmit = (event) => {
        event.preventDefault()
        if (handleLogin(username, password) === true){
          setUsername('')
          setPassword('')  
        }

      }
        
      return(
    <div>
      <h2>login</h2>
  
        <form onSubmit={handleSubmit}>
          <div>
            username <input type="text" value={username} name="Username" 
            onChange={({target}) =>  setUsername(target.value)}/>          
          </div>
          <div>
            password <input type="password" value={password} name = "Password"
            onChange={({target}) => setPassword(target.value)} />
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
    </div>
    )
}

export default LoginForm