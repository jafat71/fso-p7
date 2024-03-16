
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text: ""
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.text = action.payload;
        }
    }
})

export const {setNotification} = notificationSlice.actions

export const notify = (notification,time) => {
    return dispatch => {
        dispatch(setNotification(notification))
        setTimeout(()=>{
            dispatch(setNotification(""))
        },time*1000)
    }
}

export default notificationSlice.reducer