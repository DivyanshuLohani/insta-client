import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ImageInput from "./ImageInput";

export default function EditProfile() {
  const { auth, setAuth } = useAuth();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setName(auth.name);
    setBio(auth.bio);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    try {
      const data = new FormData();
      if (image !== null) data.append("avatar", image);
      data.append("name", name);
      data.append("bio", bio);
      const resp = await axios.post("/users/@me/edit", data);
      setAuth({ ...resp.data, token: auth.token });
      navigate("/users/" + auth.username);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  return (
    <div className="container">
      <div className="mainform">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              id="name"
              required
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-input">
            <input
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              type="text"
              name="bio"
              id="bio"
              required
            />
            <label htmlFor="bio">Bio</label>
          </div>

          <ImageInput label="Avatar" image={image} setImage={setImage} />

          <button className="btn btn-primary my-1" style={{ width: "100%" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
