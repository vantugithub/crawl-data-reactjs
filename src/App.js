import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./actions/auth";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals.js";
import CartProvider from "./store/CartProvider";
import Analysis from "./components/Analysis/Analysis.js";
import LoginContainer from "./components/Login/LoginContainer";
import { history } from "./helpers/history";
import Account from "./components/Account/Account";
import Topic from "./components/Topic/Topic";
import AddTopic from "./components/Topic/AddTopic";
import { clearMessage } from "./actions/message";
import EventBus from "./common/EventBus";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopicService from "./services/topic.service";
import ChangePassword from "./components/Account/ChangePassword";
import "react-pure-modal/dist/react-pure-modal.min.css";
toast.configure();
function App() {
  const [modal, setModal] = useState(false);

  const [SearchIsShown, setCartIsShown] = useState(false);
  const [topics, setTopics] = useState([
    {
      id: 0,
      nameTopic: "",
    },
  ]);
  const showCartHandler = () => {
    if (SearchIsShown == false) {
      setCartIsShown(true);
    } else {
      setCartIsShown(false);
    }
    setShowAdminBoard(false);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const getAllTopic = () => {
    TopicService.getAll().then(
      (response) => {
        setTopics(response.data);
      },

      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        toast.error(_content);
      }
    );
  };
  const [showClientBoard, setShowClientBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const showAdminPage = () => {
    setShowAdminBoard(true);
  };
  useEffect(() => {
    // if (currentUser) {
    //   setShowClientBoard(true);
    //   setShowAdminBoard(false);
    // } else {
    //   setShowClientBoard(false);
    //   setShowAdminBoard(false);
    // }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <CartProvider>
      <Header
        setModal={setModal}
        onShowCart={showCartHandler}
        user={currentUser}
        logOut={logOut}
        showAdminPage={showAdminPage}
      ></Header>
      <main>
        {currentUser ? (
          <div>
            <ChangePassword
              modal={modal}
              setModal={setModal}
              currentUser={currentUser}
            />
            {showAdminBoard === true ? (
              <>
                <nav>
                  <div
                    class="nav nav-tabs"
                    id="nav-tab"
                    role="tablist"
                    style={{ justifyContent: "center" }}
                  >
                    <a
                      class="nav-item nav-link active"
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#nav-home"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      Account
                    </a>
                    <a
                      class="nav-item nav-link"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#nav-profile"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Topic
                    </a>
                    <a
                      class="nav-item nav-link"
                      id="nav-contact-tab"
                      data-toggle="tab"
                      href="#nav-contact"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      AddTopic
                    </a>
                  </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <Account />
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <Topic topics={topics} getAllTopic={getAllTopic} />
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    <AddTopic getAllTopic={getAllTopic} />
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                {!SearchIsShown && <Meals></Meals>}
                {SearchIsShown && <Analysis></Analysis>}
                {}
              </>
            )}
          </div>
        ) : (
          <LoginContainer />
        )}
      </main>
    </CartProvider>
  );
}

export default App;
