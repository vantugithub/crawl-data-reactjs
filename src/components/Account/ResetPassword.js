import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import { history } from "../../helpers/history.js";

import { toast } from "react-toastify";
import ConfirmBox from "react-dialog-confirm";
import "../../../node_modules/react-dialog-confirm/build/index.css";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import AccountService from "../../services/account.service";
ChangePassWord.propTypes = {};

function ChangePassWord(props) {
  const { modal, setModal, item } = props;
  const [currentPassWord, setCurrentPassWord] = useState("");
  const [newPassword, setNewPassWord] = useState("");

  const onChangeNewPassword = (e) => {
    setNewPassWord(e.target.value);
  };
  const onSave = (e) => {
    AccountService.resetPassword(item.id, currentPassWord, newPassword).then(
      (response) => {
        setNewPassWord("");
        setModal(false);
      },
      (error) => {}
    );
  };
  const title = "Reset password of User: " + item.fullName;
  return (
    <div>
      <PureModal
        width={800}
        header={title}
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

export default ChangePassWord;
