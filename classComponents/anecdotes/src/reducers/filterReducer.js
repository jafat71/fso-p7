import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    text: ""
}
//Action
// export const setFilter = (content) => {
//     return {
//         type: "SET_FILTER",
//         payload: {
//             text: content
//         }
//     }
// }



const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.text = action.payload;
        }
    },
})

// const filterReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "SET_FILTER":
//             return action.payload.text;
//         default:
//             return state
//     }
// }

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer