import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import { history } from "../../helpers/history.js";

import { toast } from "react-toastify";
import ConfirmBox from "react-dialog-confirm";
import "../../../node_modules/react-dialog-confirm/build/index.css";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import UserService from "../../services/user.service";
ChangePassword.propTypes = {};

function ChangePassword(props) {
  const { modal, setModal, currentUser } = props;
  const [currentPassWord, setCurrentPassWord] = useState("");
  const [newPassword, setNewPassWord] = useState("");

  const onChangeCurrentPassword = (e) => {
    setCurrentPassWord(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassWord(e.target.value);
  };
  const onSave = (e) => {
    UserService.reset(currentUser.id, currentPassWord, newPassword).then(
      (response) => {
        setNewPassWord("");
        setCurrentPassWord("");
        setModal(false);
      },
      (error) => {}
    );
  };
  const title = "Change Your Password";
  return (
    <div>
      <PureModal
        width={800}
        header="Change Your Password"
        footer={
          <div>
            <button
              className="btn btn-dark mr-2"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => onSave()}>
              Save
            </button>
          </div>
        }
        style={{ background: "#333" }}
        isOpen={modal}
        closeButton="close"
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div style={{ padding: "5px 50px" }}>
          <div className="form-group">
            <input
              type="password"
              className="form-control "
              placeholder="Current Password..."
              aria-label="Search"
              aria-describedby="search-addon"
              value={currentPassWord}
              onChange={(e) => onChangeCurrentPassword(e)}
              required
            />
            <input
              type="password"
              className="form-control "
              placeholder="New Password..."
              aria-label="Search"
              aria-describedby="search-addon"
              value={newPassword}
              onChange={(e) => onChangeNewPassword(e)}
              required
            />
          </div>
        </div>
      </PureModal>
    </div>
  );
}

export default ChangePassword;
