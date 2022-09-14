import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
function ArabicSearch() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState("");
  const searchByWord = (word) => {
    const keyWord = word.trim();
    axios
      .get(`https://quran-search-api.herokuapp.com/api/search/${keyWord}`)
      .then((response) => {
        const data = response.data.data;
        setLoading(true);
        setResult(data);
        console.log(result);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };
  return (
    <div>
      <div className="d-flex justify-content-center py-5">
        <input
          type="text"
          onChange={(e) => {
            setWord(e.target.value);
          }}
          className="p-2 rounded border-secondary"
          style={{ marginLeft: "-10px" }}
        ></input>
        <Button
          variant="secondary"
          onClick={() => {
            searchByWord(word);
          }}
          className="px-5 "
        >
          بحث
        </Button>
      </div>
      {loading ? (
        <>
          {result.map((item) => {
            return (
              <div className=" shadow p-3 border border-gray mb-3 rounded" style={{ cursor: "pointer"}}>
                <p className="fs-2"> سورة {item.surah} </p>
                <p className=" fs-5  ">
                  {item.verse} ({item.numberInSurah})
                </p>
                <audio controls className="w-100" src={item.audio}></audio>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}

export default ArabicSearch;
