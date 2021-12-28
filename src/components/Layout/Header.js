import { Fragment } from "react";
import mealsImage from "../../assets/ita_wine.png";
import axios from "axios";
import classes from "./Header.module.css";
axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("userToken");
const Header = (props) => {
  const { setModal, user, logOut, onShowCart, showAdminPage } = props;

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Crawler</h1>
        {user && (
          <div class="float-right">
            <button className="btn btn-danger" onClick={() => setModal(true)}>
              Hi {user.username}
            </button>
            <button
              type="button"
              className="btn btn-danger ml-3"
              onClick={props.onShowCart}
            >
              Analysis
            </button>
            <button
              type="button"
              className="btn btn-dark ml-3"
              onClick={logOut}
            >
              Logout
            </button>
            {user.roleName === "[ROLE_ADMIN]" && (
              <div class="float-right">
                <button
                  type="button"
                  className="btn btn-danger ml-3"
                  onClick={() => showAdminPage(true)}
                >
                  ADMIN PAGE
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="" />
      </div>
    </Fragment>
  );
};

export default Header;
