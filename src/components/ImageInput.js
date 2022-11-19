import React from "react";
import { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

export default function ImageInput(props) {
  const image = props.image;
  const setImage = props.setImage;
  const imageInpRef = useRef(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (image) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        setPreview(fileReader.result);
      };

      fileReader.readAsDataURL(image);
    } else {
      setPreview("");
    }
  }, [image]);

  return (
    <>
      <label htmlFor="image">{props.label}</label>
      <div
        className="mainform container"
        style={
          !image
            ? {
                flexDirection: "column",
                cursor: "pointer",
                width: "20rem",
                height: "20rem",
              }
            : { display: "none" }
        }
        onClick={(e) => {
          imageInpRef.current.click();
        }}
      >
        <div style={{ display: "block", marginLeft: "4rem" }}>
          <FaPlus></FaPlus>
        </div>
        <p>Click here to add an Image</p>
      </div>
      <div style={{ display: "none" }}>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          required
          id="image"
          ref={imageInpRef}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <label htmlFor="image">Image</label>
      </div>
      <img
        alt="None"
        style={
          image
            ? { cursor: "pointer", width: "20rem", height: "20rem" }
            : { display: "none" }
        }
        onClick={(e) => {
          if (image) {
            imageInpRef.current.click();
          }
        }}
        src={preview}
      ></img>
    </>
  );
}
