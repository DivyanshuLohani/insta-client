import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { BASE_URL } from "../api/axios";
import useAuth from "../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import "../css/profile.css";

export default function Profile() {
  const { auth } = useAuth();
  const [following, setFollowing] = useState(false);
  const location = useLocation();
  const arr = location.pathname.split("/");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      let resp = await axios.get(`/users/${arr[arr.length - 1]}`);
      setUser(resp.data);
      if (resp.data?.follows) {
        setFollowing(true);
      }
    } catch (e) {
      if (!e.response) {
        navigate("/", { replace: true });
      } else if (e.response.status === 404) {
        // navigate("/", { replace: true });
        setUser(null);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [location.key]);

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  const handleFollow = async (e) => {
    e.target.disabled = true;
    if (following) {
      try {
        await axios.put(`/unfollow/${user.id}`);
        setFollowing(false);
        setUser({
          ...user,
          followers: user.followers - 1,
        });
      } catch (e) {}
    } else {
      try {
        await axios.put(`/follow/${user.id}`);
        setFollowing(true);
        setUser({
          ...user,
          followers: user.followers + 1,
        });
      } catch (e) {
        console.log("Something went wrong!");
      }
    }
    e.target.disabled = false;
  };
  if (user === null) {
    return (
      <div className="container position-relative my-4">
        <div className="position-absolute top-0 start-50 translate-middle-x">
          <h1 className="">This Page isn't available</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="profile">
      <header>
        <div className="img">
          <img src={user.avatar ? BASE_URL + user.avatar : ""} alt="" />
        </div>

        <div className="main">
          <h1>
            {user.username}
            <span style={{ marginLeft: "1rem", marginTop: "-0.5rem" }}>
              {auth?.username && auth.username !== user.username ? (
                <button
                  onClick={handleFollow}
                  className={
                    "btn " + (following ? "btn-outline-danger" : "btn-primary")
                  }
                >
                  {!following ? <>Follow</> : <>Unfollow</>}
                </button>
              ) : auth?.username === user.username ? (
                <>
                  <Link to="/edit-profile" className="btn btn-primary">
                    <FaEdit /> Edit Profile
                  </Link>
                </>
              ) : null}
            </span>
          </h1>
          <div className="info">
            <div>
              <b>{user.posts}</b> Posts
            </div>
            <div>
              <b>{user.followers}</b> Followers
            </div>
            <div>
              <b>{user.following}</b> Following
            </div>
          </div>
          <div className="bio">
            <b className="name d-block">{user.name}</b>
            <span>{user.bio}</span>
          </div>
        </div>
      </header>
      <div className="posts">
        <hr />
      </div>
    </div>
  );
}
