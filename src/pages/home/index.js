import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AduioComponent from "../../component/audio";
import { Link } from "react-router-dom";
import axios from "axios";
function Home() {
  const [arabic, setArabic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [surah, setSurah] = useState([]);
  const [audioSource, setAudioSource] = useState(0);
  const [surahChanged, setSurahChanged] = useState(false);
  useEffect(() => {
    axios
      .get("https://quran-endpoint.vercel.app/quran")
      .then((response) => {
        const data = response.data.data;
        setSurah(data);
        setLoading(true);
      })
      .catch(() => {});
  }, []);
  const getSrc = (index) => {
    axios
      .get(`https://quran-endpoint.vercel.app/quran/${index + 1}`)
      .then((response) => {
        const data = response.data.data;
        setAudioSource(data.ayahs);
        console.log(data.ayahs);
      })
      .catch(() => {});
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center pt-5 ">
        <Button
          variant="secondary"
          onClick={() => {
            setArabic(true);
          }}
          className="mx-3"
        >
          العربية
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setArabic(false);
          }}
        >
          الأنجليزية
        </Button>
      </div>
      <AduioComponent audioSource={audioSource} lang={arabic} change={surahChanged}></AduioComponent>
      {!loading ? (
        <p className="text-danger text-center py-5">loading</p>
      ) : arabic ? (
        <>
          <Link to="Arsearch">
            <Button variant="secondary" className="mb-3 px-5">
              بحث...
            </Button>
          </Link>
          {surah.map((item, index) => {
            return (
              <div
                key={index}
                className="shadow p-4  border border-gray rounded"
                onClick={() => {
                  setSurahChanged(true)
                  getSrc(index);
                }}
              >
                <div className="d-flex justify-content-between">
                  <p className="fs-4 ">{item.asma.ar.long}</p>
                  <p className="circle">{item.number}</p>
                </div>
                <p>عدد الأيات : ( {item.ayahCount} )</p>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div dir={"ltr"}>
            <Link to="ENsearch">
              <Button variant="secondary" className="mb-3 px-5">
                Search...
              </Button>
            </Link>
          </div>
          {surah.map((item, index) => {
            return (
              <div
                dir={"ltr"}
                key={index}
                className="shadow p-4  border border-gray rounded"
                onClick={() => {
                  setArabic(false);
                  getSrc(index);
                }}
              >
                <div className="d-flex justify-content-between">
                  <p className=" fs-4 ">{item.asma.en.short}</p>
                  <p className="circle">{item.number}</p>
                </div>
                <p>number of verses : ( {item.ayahCount} )</p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
export default Home;
