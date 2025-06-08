import { useContext, useEffect } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [notification, dispatch] = useContext(NotificationContext)

    useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [notification])

  if ( notification ) {
    return (
    <div style={style}>
      {notification}
    </div>
  )
  } else {
    return null
  }
}

export default Notification
