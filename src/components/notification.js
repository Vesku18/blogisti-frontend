import React from 'react'

const NotificationMessage = ({ message }) => {
  if (message !== null) 
    return (
    <div className="error">
      {message}
    </div>
  )
}

export default NotificationMessage