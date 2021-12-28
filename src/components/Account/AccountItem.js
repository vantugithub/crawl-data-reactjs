import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import AccountService from "../../services/account.service";
import { history } from "../../helpers/history.js";

import { toast } from "react-toastify";
import ConfirmBox from "react-dialog-confirm";
import "../../../node_modules/react-dialog-confirm/build/index.css";
import NewIcon from "./pic/new.png";
import Switch from "react-switch";
import "react-pure-modal/dist/react-pure-modal.min.css";
import ResetPassword from "./ResetPassword";
AccountItem.propTypes = {};

function AccountItem(props) {
  const { index, item, handleClose } = props;
  const [status, setStatus] = useState(item.active === 1);
  const [modal, setModal] = useState(false);
  // useEffect(() => {
  //   setStatus(item.active === 1);
  // }, [false]);
  const onChangeStatus = (id) => {
    AccountService.changeStatusAccount(id).then(
      (response) => {
        setStatus((status) => !status);
        if (status === false) {
          toast.success("Active Successfully");
        } else {
          toast.success("Block Successfully");
        }
      },
      (error) => {
        const message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    );
  };

  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        {item.active === 2 ? (
          <img src={NewIcon} style={{ width: "50%" }} />
        ) : (
          <div></div>
        )}
      </td>
      <td>{item.fullName}</td>
      <td>{item.userName}</td>
      <td>{item.email}</td>
      <td>
        {" "}
        <div
          className="status"
          title={item.active ? "Block employee" : "Active employee"}
        >
          <Switch
            height={15}
            width={30}
            onColor="#fd4848"
            checked={status}
            onChange={() => onChangeStatus(item.id)}
          />
        </div>
      </td>
      <td>
        <a
          class="delete"
          title="Delete"
          data-toggle="tooltip"
          onClick={() => handleClose(item.id)}
        >
          <i class="material-icons">&#xE872;</i>
        </a>
        <a
          class="delete"
          title="Reset password"
          data-toggle="tooltip"
          onClick={() => setModal(true)}
        >
          <i class="material-icons">&#xe312;</i>
        </a>
        <ResetPassword modal={modal} setModal={setModal} item={item} />
      </td>
    </tr>
  );
}

export default AccountItem;
