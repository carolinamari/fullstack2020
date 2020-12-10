import React from 'react'

const Notification = ({ message, messageStyle }) => {

  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default Notification