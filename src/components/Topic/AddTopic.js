import "./style.css";
import React, { useEffect, useState, useRef } from "react";
import TopicService from "../../services/topic.service";

import { toast } from "react-toastify";

AddTopic.propTypes = {};

function AddTopic(props) {
  const { getAllTopic } = props;
  const [nameTopic, setNameTopic] = useState("");

  const onChangeNameTopic = (e) => {
    setNameTopic(e.target.value);
  };
  const onAddTopic = (e) => {
    e.preventDefault();

    TopicService.addTopic(nameTopic).then(
      (response) => {
        getAllTopic();
      },
      (error) => {}
    );
  };
  const style = {
    borderRadius: "110px",
    textAlign: "center",
    justifyContent: "center",
    width: "60%",
    margin: "50px auto",
    padding: "40px",
    border: "2px solid gray",
  };
  return (
    <div style={style}>
      <form onSubmit={onAddTopic}>
        <div className="form-group">
          <input
            type="text"
            className="form-control "
            placeholder="Name Topic..."
            aria-label="Search"
            aria-describedby="search-addon"
            value={nameTopic}
            onChange={(e) => onChangeNameTopic(e)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" class="btn btn-danger mr-2">
            Add
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => setNameTopic("")}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTopic;
