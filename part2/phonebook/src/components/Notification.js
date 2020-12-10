import React from 'react'

const Notification = ({ message }) => {
  const notificationStyle = {
    color: '#C4FF7A',
    //background: '#D7FFA4',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification