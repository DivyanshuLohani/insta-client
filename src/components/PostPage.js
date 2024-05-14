import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios, { BASE_URL } from "../api/axios";
import "../css/postpage.css";
import timeSince from "../utils/timeConverter";
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegThumbsUp,
  FaThumbsUp,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useRef } from "react";

export default function PostPage(props) {
  const location = useLocation();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const { auth } = useAuth();

  const commentDivRef = useRef(null);

  const getComments = async () => {
    if (post.id === undefined) return;
    const resp = await axios.get(`/post/${post.id}/comments`);
    setComments(resp.data);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      let resp = await axios.post(`/post/${post.id}/comments`, {
        content: commentContent,
        username: auth.username,
        avatar: auth.avatar,
      });
      if (resp.status === 201) {
        setCommentContent("");
        setComments([...comments, resp.data]);
        commentDivRef.current.scrollIntoView();
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  // const handlePostLike

  useEffect(() => {
    const getPost = async () => {
      let resp = await axios.get(`/post/${location.pathname.split("/")[2]}`);
      return resp.data;
    };
    if (location.state != null) setPost(location.state.post);
    else {
      getPost().then((e) => {
        setPost(e);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (post === {}) return;
    getComments();
    document.title = post.username + " on AppSocial";
    // eslint-disable-next-line
  }, [post]);

  return (
    <div
      className="container my-2"
      style={{
        gap: "2rem",
        justifyContent: "center",
      }}
    >
      <div className="container main-con">
        <div className="post-image">
          <img src={post ? BASE_URL + post.content : ""} alt="Post"></img>
        </div>
        <div className="contents">
          <div className="userdiv">
            <div className="avatar">
              <img
                className="circular"
                src={post ? BASE_URL + "/media/" + post.avatar : ""}
                alt=""
              />
            </div>
            <Link to={`/users/${post.username}`} className="username">
              {post ? post.username : ""}
            </Link>
          </div>

          <div className="comments">
            <div className="post-comment-page">
              <div className="avatar">
                <img
                  src={post ? BASE_URL + "/media/" + post.avatar : ""}
                  alt=""
                  className="circular"
                ></img>
              </div>
              <div className="comment-content">
                <span className="username">{post ? post.username : ""}</span>{" "}
                {post ? post.caption : ""}
                <div className="post-time">
                  {timeSince(Date.parse(post.timestamp), true)
                    .slice(0, 3)
                    .replace(" ", "")
                    .toUpperCase()}
                </div>
              </div>
            </div>
            {comments.map((e, i) => {
              if (e)
                return (
                  <CommentComponent
                    key={e.id}
                    comment={e}
                    post={post}
                    comments={comments}
                    setComments={setComments}
                    idx={i}
                  />
                );
              return null;
            })}
            <div ref={commentDivRef}></div>
          </div>
          <div className="footer-content">
            <div className="post-icons">
              {post ? (
                post.liked ? (
                  <FaRegThumbsUp className="post-icon" />
                ) : (
                  <FaThumbsUp className="post-icon" />
                )
              ) : null}
              <FaRegComment className="post-icon" />
            </div>
          </div>
          <div className="post-input">
            <form onSubmit={handleComment}>
              <input
                onChange={(e) => setCommentContent(e.target.value)}
                value={commentContent}
                className="comment-input"
                placeholder="Type a comment"
                type="text"
                autoComplete="false"
              />
              <button className="btn btn-primary">Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentComponent(props) {
  const e = props.comment;
  const post = props.post;
  const { auth } = useAuth();
  const [liked, setLiked] = useState(e.liked);
  const [likes, setLikes] = useState(e.likes);

  const handleCommentLike = async (id) => {
    try {
      if (liked) {
        await axios.patch(`/post/${post.id}/comments/${id}`);
        setLiked(false);
        setLikes(likes - 1);
      } else {
        await axios.put(`/post/${post.id}/comments/${id}`);
        setLiked(true);
        setLikes(likes + 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (x) => {
    x.preventDefault();

    try {
      await axios.delete(`/post/${post.id}/comments/${e.id}`);
      props.setComments(
        props.comments.map((val) => {
          if (props.comments.indexOf(val) !== props.idx) return val;
          return undefined;
        })
      );
    } catch {}
  };

  return (
    <div className="post-comment-page my-2">
      <div className="avatar">
        <img
          src={BASE_URL + "/media/" + e.avatar}
          alt=""
          className="circular"
        ></img>
      </div>
      <div className="comment-content">
        <span className="username">{e.username}</span> {e.content}
        <div className="post-time">
          {timeSince(Date.parse(e.timestamp), true)
            .slice(0, 3)
            .replace(" ", "")
            .toUpperCase()}{" "}
          <span
            style={{
              opacity: 1,
              marginLeft: "0.9rem",
            }}
          >
            {likes} likes
          </span>
          <span
            style={{
              opacity: 1,
              marginLeft: "0.9rem",
              cursor: "pointer",
            }}
          >
            Reply
          </span>
          {e.username === auth.username ? (
            <span
              style={{
                opacity: 1,
                marginLeft: "0.9rem",
                cursor: "pointer",
                color: "#ff1100",
                fontWeight: "bold",
              }}
              onClick={handleDelete}
            >
              Delete
            </span>
          ) : null}
        </div>
      </div>
      <div className="like" onClick={(x) => handleCommentLike(e.id)}>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
}
