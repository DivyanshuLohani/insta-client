import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { auth } = useAuth();
  const [following, setFollowing] = useState(false);
  const location = useLocation();
  const arr = location.pathname.split("/");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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
    getUserData();
  }, []);
  const handleFollow = async (e) => {
    e.target.disabled = true;
    if (following) {
      try {
        let resp = await axios.put(`/unfollow/${user.id}`);
        console.log(resp);
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
        console.log(user);
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
    <div className="container">
      <div className="cover">
        <img src="/2.jpg" alt="" />
      </div>
      <div className="main">
        <h1>{user.username}</h1>
        <div>Followers: {user.followers}</div>
        <div>Following: {user.following}</div>
        {auth?.username && auth.username !== user.username ? (
          <Button
            onClick={handleFollow}
            variant={following ? "outline-danger" : "primary"}
          >
            {!following ? <>Follow</> : <>Unfollow</>}
          </Button>
        ) : (
          <>
            <Link to="/edit-profile" className="btn btn-light">
              Edit Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
