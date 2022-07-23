import React, { useState } from "react";
import axios from "../api/axios";

export default function EditProfile() {
  const [image, setImage] = useState(null);
  console.log(image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("avatar", image[0]);
      const resp = await axios.post("/users/@me/edit", data);
      console.log(resp.data);
    } catch (e) {}
  };
  return (
    <div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder="name" />

          <label htmlFor="avatar">Avatar</label>
          <input
            onChange={(e) => setImage(e.target.files)}
            type="file"
            accept="image/x-png,image/jpeg"
          />

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}
