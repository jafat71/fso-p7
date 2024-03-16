

const LoginForm = ({ handleLoginSubmit, setUsername, setPassword }) => {
    return (
        <form
            className="flex flex-col bg-#222222 w-1/2
            border-4 border-rose-700 items-center justify-center
            text-2xl m-3 p-2 border-lg text-gray-500 rounded-md shadow-md shadow-black"
            onSubmit={handleLoginSubmit}>
            <h2 className="text-rose-500 font-bold text-4xl">LOGIN FORM</h2>
            <label
                htmlFor="username"
                name="username"
                className="text-sm"
            >
                Username
            </label>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                onChange={(event) => setUsername(event.target.value)}
                required
                className="shadow shadow-rose-700
                outline-none bg-gray-600 text-white
                p-3"
            >
            </input>
            <br></br>
            <label
                htmlFor="password"
                name="password"
                className="text-sm"
            >
                Password
            </label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={(event) => setPassword(event.target.value)}
                className="shadow shadow-rose-700
                outline-none bg-gray-600 text-white
                p-3"
                required
            >
            </input>
            <br></br>
            <button id="login-button" type="submit"
            className="bg-rose-700 w-full text-white p-3 rounded-lg
            shadow-md shadow-black hover:-translate-y-2 hover:bg-gray-600
            hover:text-rose-200 transition-all duration-500 ease-in-out"
            >SUBMIT</button>
        </form>
    )
}

export default LoginForm