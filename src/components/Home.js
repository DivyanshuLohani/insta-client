import React from "react";
import useAuth from "../hooks/useAuth";
import Post from "./Post";

export default function Home() {
  const { auth } = useAuth();
  console.log(auth);
  const posts = ["first", "second", "third", "4th"];
  return (
    <div style={{ marginLeft: "2rem", marginTop: "2rem" }}>
      {posts.map((val, key) => {
        return <Post key={key} />;
      })}
    </div>
  );
}
