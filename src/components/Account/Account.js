import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import AccountService from "../../services/account.service";
import { history } from "../../helpers/history.js";

import { toast } from "react-toastify";
import ConfirmBox from "react-dialog-confirm";
import "../../../node_modules/react-dialog-confirm/build/index.css";

import AccountItem from "./AccountItem";
Account.propTypes = {};

function Account(props) {
  const [idAccount, setIdAccount] = useState();
  const [accounts, setAccounts] = useState([
    {
      fullName: "",
      userName: "",
      email: "",
      active: 0,
      lastDateUpdated: "",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (id) => {
    setIsOpen(!isOpen);
    setIdAccount(id);
  };
  const deleteAccount = (id) => {
    AccountService.deleteAccount(id).then(
      (response) => {
        toast.success("Delete Successfully");
        getAllAcount();
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
  const getAllAcount = () => {
    AccountService.getAll().then(
      (response) => {
        console.log(response.data.content);
        setAccounts(response.data.content);
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
  const handleYes = () => {
    deleteAccount(idAccount);
    setIsOpen(false);
  };
  const handleCancel = () => {
    toast.warning("You click Cancel");
    handleClose();
  };

  useEffect(() => {
    getAllAcount();
  }, []);

  return (
    <div class="container-lg">
      <div class="table-responsive">
        <div class="table-wrapper" style={{ width: "100%" }}>
          <div class="table-title">
            <div class="row">
              <div class="col-sm-8">
                <h2>
                  <b>Account</b>
                </h2>
              </div>
              <div class="col-sm-4"></div>
            </div>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Member</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((item, index) => (
                <AccountItem
                  index={index}
                  item={item}
                  handleClose={handleClose}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmBox // Note : in this example all props are required
        options={{
          icon: "https://img.icons8.com/clouds/100/000000/vector.png",
          text: "Are you sure you want to delete this element?",
          confirm: "yes",
          cancel: "no",
          btn: true,
        }}
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={() => handleYes()}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default Account;
