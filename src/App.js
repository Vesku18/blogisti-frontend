import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/loginform'
import BlogForm from './components/blogform'
import Togglable from './components/togglable.js'
import Blogs from './components/blogs'
import blogService from './services/blogs.js'
import loginService from './services/login'
import NotificationMessage from './components/notification.js'


const App = () => {


  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState('')

  const [user,setUser] = useState(null)

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  let loginStatus = user === null ? true : false

  useEffect(async () => {
    const loggedUserJSON = await window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setTimeout(setErrorMessage(`Tervetuloa taas ${user.name}`,2000))
      setTimeout(() => {setErrorMessage('')},5000)
    }
  }, [] )

  const updateAllBlogs = () => {
    blogService.getAll()
      .then(blogs => {
        console.log('promise fullfilled')
        setBlogs( blogs )})
      .catch(function (error) {
        console.log('Error', error)
        setErrorMessage(error.message)
        setTimeout(() => { setErrorMessage('')},5000)
        throw error
      })
  }

  useEffect( updateAllBlogs , [])

  const handleLogin = async (username,password) => {
    console.log('logging with', username, password)
    try{
      const response = await loginService.login({ username,password })
      console.log('response status:',response.status)
      console.log('response data:',response.data)
      if (response.status === 200){
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response.data))
        console.log('Asetetaan local storakeen',response.data)
        blogService.setToken(response.data.token)
        setUser(response.data)
        loginFormRef.current.toggleVisibility()

        return true
      }
    } catch(error) {
      console.log('wrong credentials')
      setErrorMessage('V????r?? tunnus tai salasana')
      setTimeout(() => {setErrorMessage('')},5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.getAll()
  }

  const logout_button = () => {
    if (user !== null)
      return (
        <div>
          <p>{user.name} logged in
            <button onClick = {handleLogout}> Logout </button>
          </p>
        </div>
      )
  }

  const addBlog = async (blogToCreate) => {

    blogFormRef.current.toggleVisibility()

    try{
      console.log('Luodaan uusi', blogToCreate)
      const returnedBlog = await blogService.create(blogToCreate)
      setBlogs( blogs.concat(returnedBlog))
      setErrorMessage('Uusi tietue lis??tty')
      setTimeout(() => {setErrorMessage('')},5000)
    }
    catch(error){
      console.log('Joku virhe', error)
      setErrorMessage(error)
      setTimeout(() => { setErrorMessage('')},5000)
    }
  }

  const updateBlog = async (id, newData) => {
    const response = await blogService.update(id, newData)
    console.log(response)
    setErrorMessage('Tykk????t siis tosiaan siit??')
    setTimeout(() => {setErrorMessage('')},5000)
    return response
  }

  const deleteBlog = async (id) => {
    const response = await blogService.deleteRecord(id)
    if (response === 204){
      setErrorMessage('Tietue poistettu')
      setTimeout(() => { setErrorMessage('')},5000)
      updateAllBlogs()
    }
    else {
      setErrorMessage('Poisto ei onnistunut')
      setTimeout(() => {setErrorMessage('')},5000)
    }
  }

  const loginForm = (loginStatus) => (
    <Togglable buttonLabel = 'login' ref = {loginFormRef} defaultStatus={loginStatus} log={loginStatus}>
      <LoginForm handleLogin = {handleLogin} />
    </Togglable>
  )


  const blogForm = () => (
    <Togglable buttonLabel='create new' ref = {blogFormRef} defaultStatus={false}>
      <BlogForm addBlog = {addBlog} />
    </Togglable>
  )


  return (
    <div>

      <NotificationMessage message={errorMessage} />

      {loginForm({ loginStatus })}

      {logout_button() }

      {user !== null && blogForm()}

      <Blogs user={user} blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog}/>

    </div>
  )
}

export default App