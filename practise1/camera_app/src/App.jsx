import React, { useEffect, useRef ,useState} from "react";
import CameraApp from "./CameraApp";
import "./App.css";

function App() {
  const videRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    const data = navigator.mediaDevices.getUserMedia({ video: true });
    data
      .then((res) => {
        videRef.current.srcObject = res;
      })
      .catch((err) => {
        console.log("camera is not opening ...", err);
      });
  }, []);

  const handleClick = () => {
    const video = videRef.current;
    const board = canvasRef.current;
    board.width = video.videoWidth;
    board.height = video.videoHeight;
    const context = board.getContext("2d");
    context.drawImage(video, 0, 0, board.width, board.height);

    const dataUrl = board.toDataURL("image/png")
    setImage(dataUrl)
  };

  return (
    <>
      <video ref={videRef} autoPlay controls />
      <div>
        <button onClick={handleClick}>Click photo</button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      
      <img src={image} />
      <div>
        <a href={image} download={"my-image"}><img src={"image.png"} /></a>

      </div>
    </>
  );
}

export default App;
