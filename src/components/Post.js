import React, { useEffect, useState } from "react";
import "../css/post.css";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import axios, { BASE_URL } from "../api/axios";
import PropTypes from "prop-types";

export default function Post(props) {
  const {
    id,
    username,
    avatar,
    caption,
    image,
    likes,
    comments,
    date,
    liked,
    comment_snippet,
  } = props;
  const { theme } = useTheme();
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const { auth } = useAuth();
  const postStyle = {
    border: theme !== "dark" ? "0.01rem solid rgb(221, 221, 221)" : null,
  };
  useEffect(
    () => setLike(liked ? true : false),
    // eslint-disable-next-line
    []
  );
  const toggleLike = async (e) => {
    try {
      if (!like) await axios.put(`/post/${id}/like`);
      else {
        await axios.delete(`/post/${id}/like`);
      }
    } catch (e) {
      console.log(e.response.data);
    }
    setLike(!like);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      let resp = await axios.post(`/post/${id}/comments`, {
        content: comment,
        username: auth.username,
        avatar: auth.avatar,
      });
      if (resp.status === 201) {
        setComment("");
      }
      console.log(resp);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <div className={`post ${theme}`} style={postStyle}>
      <div className="top-bar">
        <img className="circular" src={BASE_URL + "/media/" + avatar} alt="" />
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
            <div className="likedby">Liked by {likes} others</div>
            <Link className="username-text " to={`/users/${username}`}>
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
          {comment_snippet?.map((val, idx) => {
            return (
              <div key={idx} className="post-comment">
                <Link to={`/users/${val.username}`} className="username-text">
                  {val.username}
                </Link>{" "}
                {val.content}
              </div>
            );
          })}
          <span className="text-muted post-time">{date}</span>
        </div>
      </div>
      <div className="post-footer">
        <form onSubmit={handleComment} className="comment-form">
          <label htmlFor="comment" aria-readonly={true} className="d-none">
            Comment
          </label>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Add a comment"
            required
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            className="link"
            style={{ background: "none", border: "none", fontSize: "medium" }}
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
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
