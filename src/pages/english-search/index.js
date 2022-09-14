import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
function EnglishSearch() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [word, setWord] = useState("");
    const searchByWord = (word) => {
      const keyWord = word.trim();
      axios
        .get(`http://api.alquran.cloud/v1/search/${keyWord}/all/en`)
        .then((response) => {
          const data = response.data.data.matches;
          setLoading(true);
          setResult(data);
          console.log(data);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    };
    return (
      <div dir={"ltr"}>
        <div className="d-flex justify-content-center py-5">
    
          <input
            type="text"
            onChange={(e) => {
              setWord(e.target.value);
            }}
            className="p-2 rounded border-secondary"
            style={{ marginRight: "-10px" }}
          ></input>
           <Button
          variant="secondary"
          onClick={() => {
            searchByWord(word);
          }}
          className="px-5 "
        >
          Search
        </Button>
        </div>
        {loading ? (
          <>
            {result.map((item,index) => {
              return (
                <div key={index} style={{ cursor: "pointer"}} className=" shadow py-3 px-4 border border-gray mb-3 rounded">
                  <p className="fs-2"> {item.surah.englishName} </p>
                  <p className=" fs-5  ">
                    {item.text} ({item.numberInSurah})
                  </p>
                  
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    );
}

export default EnglishSearch