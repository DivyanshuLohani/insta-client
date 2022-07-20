import React from "react";
import "../css/post.css";
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa";

export default function Post() {
  return (
    <div className="post dark">
      <div className="top-bar">
        <img className="circular" src="/defaultuser.png" alt="" />
        <div className="post-name">username</div>
      </div>
      <div className="post-content">
        <img src="/2.jpg" alt="" />
        <div className="post-content-footer">
          <div className="post-icons">
            <FaRegThumbsUp
              className="post-icon"
              onClick={(e) => console.log(e.target)}
            />
            <FaRegComment className="post-icon" />
          </div>
          <div className="post-caption">
            <b>username</b> Caption
          </div>
          <span
            className="text-muted"
            style={{
              marginTop: "1rem",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            View 100 comments
          </span>
          {/* <div className="post-comment">
            <b>username</b> Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Qui iste accusantium iure nisi eligendi doloribus unde
          </div>
          <div className="post-comment">
            <b>username</b> comment
          </div> */}
          <span className="text-muted post-time">1 DAY AGO</span>
        </div>
      </div>
      <div className="post-footer"></div>
    </div>
  );
}
