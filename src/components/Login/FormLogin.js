import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const FormLogin = (props) => {
  const { setIsLogin } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = (e) => {
    e.preventDefault();

    dispatch(login(username, password))
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        // window.location.reload();
      });
  };

  return (
    <div>
      <p>Login Page</p>

      <form onSubmit={onLogin} style={{ width: "80%", margin: "2px auto" }}>
        <div className="form-group">
          <input
            type="text"
            className="form-control "
            placeholder="Username..."
            aria-label="Search"
            aria-describedby="search-addon"
            value={username}
            onChange={(e) => onChangeUsername(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password..."
            aria-label="Search"
            aria-describedby="search-addon"
            value={password}
            onChange={(e) => onChangePassword(e)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" class="btn btn-primary mr-2">
            Login
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
