import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import ImageInput from "./ImageInput";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("content", image);
      formData.append("caption", caption);
      formData.append("avatar", auth.avatar);
      await axios.post("/users/@me/posts", formData);
      navigation("/", { from: location, replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div className="mainform">
        <h2 style={{ marginBottom: "2rem" }}>Create a Post</h2>
        <form onSubmit={handleSubmit}>
          <ImageInput image={image} setImage={setImage} />
          <div className="form-input">
            <input
              onChange={(e) => setCaption(e.target.value)}
              type=""
              id="caption"
              required
            />
            <label htmlFor="caption">Caption</label>
          </div>

          <button style={{ width: "100%" }} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
