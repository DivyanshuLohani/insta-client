import React, { useEffect, useState } from "react";
import Post from "./Post";
import "../css/home.css";
import axios from "../api/axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  // const { auth } = useAuth();
  document.title = "AppSocial";
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const fetchPots = async () => {
    try {
      let resp = await axios.get("/users/@me/home");
      setPosts(resp.data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchPots();
  }, [location.key]);

  return (
    <div style={{ marginTop: "2rem" }} className="container">
      <div className="posts">
        {posts.map((val, key) => {
          console.log(val);
          return (
            <Post
              key={key}
              id={val.id}
              username={val.username}
              avatar={val.avatar}
              caption={val.caption}
              image={val.content}
              likes={val.likes}
              comments={val.comments}
              liked={val.liked}
              timestamp={val.timestamp}
              comment_snippet={val.comment_snippet}
            />
          );
        })}
      </div>
      {/* <div className="sidebar"></div> */}
    </div>
  );
}
