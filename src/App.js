import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import CreatePost from "./components/CreatePost";
import PostPage from "./components/PostPage";

function App() {
  return (
    <Routes>
      {/* NOT PROTECTED ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      <Route path="/" element={<Layout />}>
        <Route path="/users/*" element={<Profile />}></Route>

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/edit-profile" element={<EditProfile />}></Route>
          <Route path="/post" element={<CreatePost />}></Route>
          <Route path="/post/*" element={<PostPage />}></Route>
          <Route path="" element={<Home />}></Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
