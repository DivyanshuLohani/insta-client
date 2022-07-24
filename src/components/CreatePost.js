import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("content", image[0]);
      formData.append("caption", caption);
      const resp = await axios.post("/users/@me/posts", formData);
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
          <div className="form-input">
            <input
              onChange={(e) => setImage(e.target.files)}
              type="file"
              required
              id="image"
            />
            <label htmlFor="image">Image</label>
          </div>
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
