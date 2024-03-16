
const Notification = ({ message }) => {

    if (message === null) {
        return null
    }

    return (
        <div style={{ backgroundColor: "aquamarine", color: "black", padding: "1rem", fontSize: "x-large" }} >
            <h4>NOTIFICATION</h4>
            {message}

        </div>
    )
}
export default Notification