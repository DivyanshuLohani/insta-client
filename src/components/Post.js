import React, { useEffect, useState } from "react";
import "../css/post.css";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api/axios";
import PropTypes from "prop-types";

export default function Post(props) {
  const { username, avatar, caption, image, likes, comments, date, liked } =
    props;
  const { theme } = useTheme();
  const [like, setLike] = useState(false);
  const postStyle = {
    border: theme !== "dark" ? "0.01rem solid rgb(221, 221, 221)" : null,
  };
  useEffect(() => setLike(liked ? true : false), []);
  const toggleLike = async (e) => {
    setLike(!like);
  };
  return (
    <div className={`post ${theme}`} style={postStyle}>
      <div className="top-bar">
        <img
          className="circular"
          src={avatar ? BASE_URL + avatar : "/defaultuser.png"}
          alt=""
        />

        <div className="post-name">
          <Link to={`/users/${username}`}>{username}</Link>
        </div>
      </div>
      <div className="post-content">
        <img
          onDoubleClick={toggleLike}
          src={image ? BASE_URL + image : "/2.jpg"}
          alt=""
        />
        <div className="post-content-footer">
          <div className="post-icons">
            {!like ? (
              <FaRegThumbsUp className="post-icon" onClick={toggleLike} />
            ) : (
              <FaThumbsUp className="post-icon" onClick={toggleLike} />
            )}
            <FaRegComment className="post-icon" />
          </div>
          <div className="post-caption">
            <Link className="username-text " to={`/users/`}>
              {username}
            </Link>{" "}
            {caption}
          </div>
          <span
            className="text-muted username-text"
            style={{
              marginTop: "1rem",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            View {comments} {comments === 1 ? "comment" : "comments"}
          </span>
          {/* <div className="post-comment">
            <b>username</b> Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Qui iste accusantium iure nisi eligendi doloribus unde
          </div>
          <div className="post-comment">
            <b>username</b> comment
          </div> */}
          <span className="text-muted post-time">{date}</span>
        </div>
      </div>
      <div className="post-footer"></div>
    </div>
  );
}

Post.protoTypes = {
  username: PropTypes.string,
  avatar: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.number,
  date: PropTypes.string,
  liked: PropTypes.bool,
};
