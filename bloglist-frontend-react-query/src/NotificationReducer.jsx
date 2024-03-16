
export const notificationReducer = (state, action) => {
    switch (action.type) {
        case "ON":
            state = action.payload
            return action.payload
        case "OFF":
            return null
        default:
            return state
    }
}
