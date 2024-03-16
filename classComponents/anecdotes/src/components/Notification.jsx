import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector((state) => state.notification.text)

  const hiddenStyle  = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: 'hidden'
  }

  const visibleStyle  = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: 'visible'
  }

  return (
    <div style={notification && visibleStyle || hiddenStyle}>
      {notification}
    </div>
  )
}

export default Notification