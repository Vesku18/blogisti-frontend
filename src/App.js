import React, { useState, useEffect } from 'react'
import Blogs from './components/blogs'
import blogService from './services/blogs.js'
import loginService from './services/login'
import Notification from './components/notification.js'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const [user,setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setErrorMessage(`Tervetuloa taas ${user.name}`) 
      setTimeout(()=>{setErrorMessage(null)},2000)
    }
  }, [] )

/*
  useEffect(() => {    
    blogService.getAll()
    .then(blogs => { 
      console.log('promise fullfilled')
      setBlogs( blogs )})  
    .catch(function (error) {
      console.log("Error", error)
      setErrorMessage(error.message) 
      setTimeout(()=>{setErrorMessage(null)},5000)
      throw error
    })
  }, [])

  */
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with', username, password)
    try{
      const user = await loginService.login({ username,password })
      console.log(user.status)
      if (user.status === 200){
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      }
    } catch(error) {
      console.log('wrong credentials')
      setErrorMessage("Väärä tunnus tai salasana") 
      setTimeout(()=>{setErrorMessage(null)},5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }
  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogToCreate = {
      'title': newBlog,
      'author': newAuthor,
      'url': newUrl
    }
    blogService.create(blogToCreate)
    .then(returnedBlog => {
      setBlogs( blogs.concat(returnedBlog))
      setNewBlog('')
      // EI ERROR MUTTA KÄYTETÄÄN TÄTÄ
      setErrorMessage("Uusi tietue lisätty") 
      setTimeout(()=>{setErrorMessage(null)},5000)
    })
    .catch( (error) => {
      console.log("Joku virhe", error)
      setErrorMessage(error) 
      setTimeout(()=>{setErrorMessage(null)},5000)
    })
  }

  const loginForm = () =>(
  <div>
    <h2>login</h2>
      <form onSubmit={handleLogin} >

        <div>
          username <input type="text" value={username} name="Username" 
          onChange={({target}) =>  setUsername(target.value)}/>          
        </div>
        <div>
          password <input type="password" value={password} name = "Password"
          onChange={({target}) => setPassword(target.value)} />
        </div>

        <button type="submit">login</button>
        </form>
  </div>
  )

  const blogForm = () => (  
    <form onSubmit={addBlog}>
      <p>Blog<input type ="text" value={newBlog} 
      onChange={handleBlogChange} /> </p>
      <p>Author<input type ="text" value={newAuthor} 
      onChange={handleAuthorChange} /></p>
      <p>Url<input type ="text" value={newUrl} 
      onChange={handleUrlChange} /></p>
      <button type="submit">save</button>
    </form>
  )
  
  return (
    <div>
      <Notification message={errorMessage}/>

      {user === null ? loginForm() : 
      <div>
        <p>{user.name} logged in <button onClick = {handleLogout}> Logout </button>
        </p>
      </div>
      }
      {user !== null && blogForm()}
      
      <Blogs user={user} blogs={blogs} /> 

    </div>
  )
}


export default App