import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import TopicService from "../../services/topic.service";
import { history } from "../../helpers/history.js";

import { toast } from "react-toastify";
import ConfirmBox from "react-dialog-confirm";
import "../../../node_modules/react-dialog-confirm/build/index.css";
import Switch from "react-switch";
TopicItem.propTypes = {};

function TopicItem(props) {
  const { index, item, handleClose } = props;
  const [status, setStatus] = useState(item.active === 1);
  // useEffect(() => {
  //   setStatus(item.active === 1);
  // }, []);
  const onChangeStatus = (id) => {
    TopicService.changeStatusTopic(id).then(
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
      <td>{item.nameTopic}</td>

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
      </td>
    </tr>
  );
}

export default TopicItem;
