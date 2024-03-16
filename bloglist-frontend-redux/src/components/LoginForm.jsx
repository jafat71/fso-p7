const LoginForm = ({ handleLoginSubmit, setUsername, setPassword }) => {
  return (
    <form onSubmit={handleLoginSubmit}>
      <h2>LOGIN FORM</h2>
      <label htmlFor="username" name="username" style={{ marginRight: "2rem" }}>
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter your username"
        onChange={(event) => setUsername(event.target.value)}
        required
      ></input>
      <br></br>
      <label htmlFor="password" name="password" style={{ marginRight: "2rem" }}>
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        onChange={(event) => setPassword(event.target.value)}
        required
      ></input>
      <br></br>
      <button id="login-button" type="submit">
        SUBMIT
      </button>
    </form>
  );
};

export default LoginForm;
