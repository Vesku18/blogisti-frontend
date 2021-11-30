import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const add = (event) => {
    event.preventDefault()
    const blogToCreate = {
      'title': newBlog,
      'author': newAuthor,
      'url': newUrl
    }

    console.log(blogToCreate)
    addBlog(blogToCreate)
    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <form onSubmit={add}>
      <p>Blog<input id='text' type ='text' value={newBlog}
        onChange={(event) => { setNewBlog(event.target.value)}} /> </p>
      <p>Author<input id='author' type ='text' value={newAuthor}
        onChange={ (event) => { setNewAuthor(event.target.value)}} /> </p>
      <p>Url<input id='url' type ='text' value={newUrl}
        onChange={(event) => { setNewUrl(event.target.value)}} /> </p>
      <button type='submit'>save</button>
    </form>
  )
}

export default BlogForm