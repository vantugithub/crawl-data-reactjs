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

function cleanText(text) {
  let array_temp = text.split(" ");
  let text_ = "";
  for (let i = 0; i < array_temp.length; i++) {
    if (array_temp[i].includes("#")) {
      text_ += array_temp[i] + " ";
    }
  }
  text_ = text_.split("#");
  let rs = "";
  for (let i = 0; i < text_.length; i++) {
    let tx = text_[i].replace(" ", "");
    if (tx.length > 0) {
      rs += tx + " ";
    }
  }
  rs = rs.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );
  return rs;
}

const getAllWords = (data) => {
  const list_infoo = data;

  let long_string = "";

  for (let i = 0; i < list_infoo.length; i++) {
    if (String(list_infoo[i]["caption"]).length > 1) {
      list_infoo[i]["caption"] = cleanText(list_infoo[i]["caption"])
        .replace(/\n/g, " ")
        .toLowerCase();
      long_string += list_infoo[i]["caption"] + " ";
    }
  }
  const arr_string = long_string.split(" ");

  const total = [];
  const map1 = new Map();

  for (let i = 0; i < arr_string.length; i++) {
    if (arr_string[i].length > 1) {
      total[arr_string[i]]
        ? total[arr_string[i]]++
        : (total[arr_string[i]] = 1);
      map1.set(arr_string[i], 1);
    }
  }

  const word = [];

  for (const [key, value] of Object.entries(total)) {
    word.push({
      text: key,
      value: value,
    });
  }

  console.log(word);

  word.sort(function (a, b) {
    var keyA = a.value,
      keyB = b.value;
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  return word;
};

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);
const size = [600, 400];

const separateWord = (data) => {
  let listWords = [];
  let breakLoop = 0;
  for (const variable in data) {
    if (breakLoop == 29) {
      break;
    }
    listWords.push(data[variable].text);
    breakLoop += 1;
  }

  return listWords;
};

const separateNumber = (data) => {
  let listWords = [];
  let breakLoop = 0;
  for (const variable in data) {
    if (breakLoop == 29) {
      break;
    }
    listWords.push(data[variable].value);
    breakLoop += 1;
  }

  return listWords;
};

const SearchHashTag = () => {
  const ctx = React.useContext(CartContext);
  const [listWords, setListWords] = useState([]);
  const [listWordsForBar, setListWordsForBar] = useState([]);
  const [listNumberOfWordForBar, setListNumberOfWordForBar] = useState([]);

  useEffect(() => {
    let wd = ctx.textSearchHashTag.replace(/ /g, "");

    axios
      .get(
        `https://python-instagram-crawler.herokuapp.com/ins/gethashtag/${wd}`
      )
      .then((response) => response.data)
      .then((data) => {
        let temp = getAllWords(data);
        setListWords(temp);
        setListWordsForBar(separateWord(temp));
        setListNumberOfWordForBar(separateNumber(temp));
      });
    console.log("affect search hashtag");
  }, [ctx.textSearchHashTag]);

  if (ctx.textSearchHashTag.length < 2) {
    return <div></div>;
  }
  return (
    <section className={classes.meals}>
      <br />
      <br />
      <h1 className={classes.texth1}>
        Statistics by word cloud and statistics by chart{" "}
      </h1>
      <br />
      <br />
      <br />
      <br />
      <WordCloud
        data={listWords}
        width={500}
        height={500}
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => Math.log2(word.value) * 5}
        spiral="rectangular"
        rotate={(word) => word.value % 360}
        padding={5}
        random={Math.random}
        fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
        onWordClick={(event, d) => {}}
        onWordMouseOver={(event, d) => {}}
        onWordMouseOut={(event, d) => {}}
      />

      <br />
      <br />

      <br />
      <br />
      <div className={classes.background_bar}>
        <Bar
          data={{
            labels: listWordsForBar,
            datasets: [
              {
                label: "Population (count)",
                backgroundColor: getListColorRandom,
                data: listNumberOfWordForBar,
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
                  text: "Quantity of hashtag",
                  fontSize: 20,
                  fontStyle: "bold",
                },
              },
            },
          }}
        />
      </div>
    </section>
  );
};
export default SearchHashTag;
