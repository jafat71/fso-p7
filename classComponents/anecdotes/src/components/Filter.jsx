//import {setFilter} from "../reducers/filterReducer";
import { setFilter } from "../reducers/filterReducer" 
import {useDispatch, useSelector} from "react-redux"
/* eslint-disable no-unused-vars */
const Filter = () => {
    
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification.text)


    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        //dispatch(setFilter(event.target.value))
        dispatch(setFilter(event.target.value))
        
    }
    const style = {
        marginBottom: 10,
        visibility: 'visible'
    }

    const hiddenStyle = {
        visibility: 'hidden'
    }

    return (
        <div style={notification && hiddenStyle || style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter