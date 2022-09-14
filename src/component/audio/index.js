import { useEffect, useRef, useState } from "react";
function AduioComponent(props) {
  const ayahs = props.audioSource;
  const language = props.lang;
  const [src, setSrc] = useState("");
  const [index, setIndex] = useState(0);
  const audioRef = useRef(null);
  const [isPlay, setIsPlay] = useState(props.play);
  const [text, setText] = useState("اضغط على السورة للاستماع اليها ");
  const handlePlay = () => {
    setIsPlay(true);
    audioRef.current.play();
  };
  const handlePause = () => {
    setIsPlay(false);
    audioRef.current.pause();
  };

useEffect(()=>{
setIndex(0)
  },[ayahs])
  useEffect(() => {
 ayahs.length> 0
      ? language
        ? setText(ayahs[index].text.ar)
        : setText(ayahs[index].translation.en)
      : language?
      setText("اضغط على السورة للاستماع اليها "):
      setText("Click on the surah to listen to it")
      ayahs.length > 0 ? setSrc(ayahs[index].audio.url) : setSrc("");
  });
  return (
    <div
      className="gradient my-5 p-5 text-center sticky-top"
      style={{ color: "#e3dbdb" }}
    >
      <p className="mb-4">{text}</p>
      <audio
        ref={audioRef}
        controls
        autoPlay
        className="w-100"
        src={src}
        onEnded={() => {
          index === ayahs.length - 1 ? setIndex(0) : setIndex(index + 1);
          }}
        onPlaying={() => {
      setIsPlay(true);
        }}
      ></audio>
      <div className="d-flex align-items-center justify-content-around pt-5">
        <button
          className=" m-3 bg-red rounded-circle border-0"
          style={{ width: "50px", height: "50px" }}
          onClick={() => {
            index === ayahs.length - 1 ? setIndex(0) : setIndex(index + 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="currentColor"
            class="bi bi-fast-forward-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
            <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
          </svg>
        </button>
        <button
          className="m-3 rounded-circle border-0"
          style={{ width: "50px", height: "50px" }}
        >
          {isPlay ? (
            <svg
              onClick={() => {
                handlePause();
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-pause-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
            </svg>
          ) : (
            <svg
              onClick={() => {
                handlePlay();
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-play-fill"
              viewBox="0 0 16 16"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          )}
        </button>
        <button
          className="m-3 rounded-circle border-0"
          style={{ width: "50px", height: "50px" }}
          onClick={() => {
            index > 0 ? setIndex(index - 1) : setIndex(0);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="currentColor"
            class="bi bi-rewind-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L8.404 7.304Z" />
            <path d="M.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L.404 7.304Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default AduioComponent;
