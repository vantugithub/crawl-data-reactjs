import React, { useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import classes from "./AvailableMeals.module.css";

import axios from "axios";
import CartContext from "../../store/cart-context";
import { Bar } from "react-chartjs-2";

function generateRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const getListColorRandom = () => {
  let arrColor = [];
  for (var i = 0; i < 29; i++) {
    arrColor.push(generateRandomColor());
  }
  return arrColor;
};

const separateWord = (data) => {
  let listWords = [];
  for (const variable in data) {
    listWords.push(data[variable].nameHashtag);
  }

  return listWords;
};

const separateNumber = (data) => {
  let listWords = [];
  for (const variable in data) {
    listWords.push(data[variable].count);
  }

  return listWords;
};

const Analysis = () => {
  const [listData, setListData] = useState([]);
  const [listTopic, setListTopic] = useState([]);
  const [listDate, setListDate] = useState([]);
  const [startDate, setstartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    axios
      .get(`https://instagram-smart-crawler.herokuapp.com/api/posts/dates`)
      .then((response) => response.data)
      .then((data) => {
        setListDate(data.listDate);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://instagram-smart-crawler.herokuapp.com/api/posts/topics`)
      .then((response) => response.data)
      .then((data) => {
        setListTopic(data);
      });
  }, []);

  const lisDate = listDate.map((item) => <option>{item.date}</option>);

  const lisTopic = listTopic.map((item) => <option>{item.nameTopic}</option>);

  const handleDropdownChangeStartDate = (e) => {
    setstartDate(e.target.value);
  };

  const handleDropdownChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handleDropdownChangeTopic = (e) => {
    setTopic(e.target.value);
  };

  const submit = () => {
    axios
      .get(
        `https://instagram-smart-crawler.herokuapp.com/api/posts/analysis?startDate=${startDate}&endDate=${endDate}&nameTopic=${topic}`
      )
      .then((response) => response.data)
      .then((data) => {
        let temp = data;
        setListData(temp);
      });
  };

  return (
    <section className={classes.meals}>
      <br />
      <h1 className={classes.texth1}>Hashtag statistics by day</h1>
      <br />
      <br />
      <br />

      <div className={classes.center}>
        <div className="dropdown">
          <label htmlFor="exampleFormControlSelect1"></label>
          <select
            className="btn btn-success dropdown-toggle"
            id="startDate"
            onChange={handleDropdownChangeStartDate}
          >
            {lisDate}
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="exampleFormControlSelect1"></label>
          <select
            className="btn btn-success dropdown-toggle"
            id="endDate"
            onChange={handleDropdownChangeEndDate}
          >
            {lisDate}
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="exampleFormControlSelect1"></label>
          <select
            className="btn btn-success dropdown-toggle"
            id="endDate"
            onChange={handleDropdownChangeTopic}
          >
            {lisTopic}
          </select>
        </div>

        <button className="btn btn-danger" type="button" id="" onClick={submit}>
          Submit
        </button>
      </div>

      <br />
      <br />

      <div className={classes.background_bar}>
        {listData.map((item) => (
          <Bar
            data={{
              labels: separateWord(item.listAnalysis),
              datasets: [
                {
                  label: "Population (count)",
                  backgroundColor: getListColorRandom,
                  data: separateNumber(item.listAnalysis),
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  title: {
                    color: "blue",
                    display: true,
                    text: "Hashtag",
                    fontSize: 20,
                    fontStyle: "bold",
                  },
                },
                y: {
                  title: {
                    color: "red",
                    display: true,
                    text: item.date,
                    fontSize: 20,
                    fontStyle: "bold",
                  },
                },
              },
            }}
          />
        ))}
      </div>
    </section>
  );
};
export default Analysis;
