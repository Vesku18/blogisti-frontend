import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './blogs'

const oneBlogList =
    [{
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }]

test('renders content', () => {

  const component = render(
    <Blog key = '1' user = '123' blogs = {oneBlogList} />
  )

  expect( component.container).toHaveTextContent('Go To Statement Considered Harmful')
})