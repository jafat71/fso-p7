import { createContext, useContext, useReducer } from "react"
import { notificationReducer } from "./NotificationReducer"
import { userReducer } from "./UserReducer"

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
    const [notification, dispatchNotification] = useReducer(notificationReducer, null)
    const [blogUser, dispatchUser] = useReducer(userReducer, null)

    return (
        <CounterContext.Provider value={[
            notification,
            dispatchNotification,
            blogUser,
            dispatchUser
        ]}>
            {props.children}
        </CounterContext.Provider>
    )
}

export const useNotificationValue = () => {
    const fullContext = useContext(CounterContext)
    return fullContext[0]
}

export const useNotificationDispatch = () => {
    const fullContext = useContext(CounterContext)
    return fullContext[1]
}

export const useBlogUserValue = () => {
    const fullContext = useContext(CounterContext)
    return fullContext[2]
}

export const useBlogUserDispatch = () => {
    const fullContext = useContext(CounterContext)
    return fullContext[3]
}

export default CounterContext
