import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import TopicService from "../../services/topic.service";
import { history } from "../../helpers/history.js";

import { toast } from "react-toastify";
import ConfirmBox from "react-dialog-confirm";
import "../../../node_modules/react-dialog-confirm/build/index.css";

import TopicItem from "./TopicItem";
Topic.propTypes = {};

function Topic(props) {
  const { topics, getAllTopic } = props;
  const [idTopic, setIdTopic] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (id) => {
    setIsOpen(!isOpen);
    setIdTopic(id);
  };
  const deleteTopic = (id) => {
    TopicService.deleteTopic(id).then(
      (response) => {
        toast.success("Delete Successfully");
        getAllTopic();
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

  const handleYes = () => {
    deleteTopic(idTopic);
    setIsOpen(false);
  };
  const handleCancel = () => {
    toast.warning("You click Cancel");
    handleClose();
  };

  useEffect(() => {
    getAllTopic();
  }, []);

  return (
    <div class="container-lg">
      <div class="table-responsive">
        <div class="table-wrapper" style={{ width: "100%" }}>
          <div class="table-title">
            <div class="row">
              <div class="col-sm-8">
                <h2>
                  <b>Topic</b>
                </h2>
              </div>
              <div class="col-sm-4"></div>
            </div>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((item, index) => (
                <TopicItem
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

export default Topic;
