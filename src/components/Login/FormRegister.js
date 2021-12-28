import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../../helpers/history";
toast.configure();
const FormRegister = (props) => {
  const { setIsLogin } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeFullname = (e) => {
    setFullname(e.target.value);
  };

  const onRegister = (e) => {
    e.preventDefault();
    dispatch(register(email, fullname, password, username))
      .then((response) => {
        setIsLogin(true);
      })
      .catch((error) => {
        alert(error);
        return;
      });
  };

  return (
    <div>
      <p>Register Page</p>
      <form onSubmit={onRegister} style={{ width: "80%", margin: "2px auto" }}>
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
          <input
            type="email"
            className="form-control"
            placeholder="Email..."
            aria-label="Search"
            aria-describedby="search-addon"
            value={email}
            onChange={(e) => onChangeEmail(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Fullname"
            aria-label="Search"
            aria-describedby="search-addon"
            value={fullname}
            onChange={(e) => onChangeFullname(e)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" class="btn btn-primary mr-2">
            Register
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
