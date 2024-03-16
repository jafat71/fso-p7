
export const userReducer = (state, action) => {
    switch (action.type) {
        case "ON":
            state = action.payload
            return state
        case "OFF":
            state = null
            return state
        default:
            return state
    }
}
