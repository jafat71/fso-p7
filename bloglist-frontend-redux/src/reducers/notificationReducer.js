import { createSlice } from '@reduxjs/toolkit'
const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: null,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
    }
})

export const { setMessage } = notificationsSlice.actions
export default notificationsSlice.reducer