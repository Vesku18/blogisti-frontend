import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './blogs'

const oneBlogList =
    [{
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }]

test('renders content and opens full view and press like button twice ', () => {

  const updateBlog = jest.fn()

  const component = render(
    <Blog key = '1' user = '123' blogs = {oneBlogList} updateBlog ={updateBlog} />
  )

  const button_show = component.getByText('Show')
  fireEvent.click(button_show)

  const button_like = component.getByText('like')
  fireEvent.click(button_like)
  fireEvent.click(button_like)


  expect( updateBlog.mock.calls ).toHaveLength(2)
})