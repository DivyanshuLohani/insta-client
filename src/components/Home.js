import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Post from "./Post";
import timeSince from "../utils/timeConverter";
import "../css/home.css";
import axios from "../api/axios";

export default function Home() {
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const fetchPots = async () => {
    try {
      let resp = await axios.get("/users/@me/home");
      setPosts(resp.data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchPots();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }} className="container">
      <div className="posts">
        {posts.map((val, key) => {
          return (
            <Post
              key={key}
              username={val.username}
              avatar={""}
              caption={val.caption}
              image={val.content}
              likes={10}
              comments={10}
              liked={true}
              date={timeSince(Date.parse(val.timestamp))}
            />
          );
        })}
      </div>
      <div className="sidebar"></div>
    </div>
  );
}
