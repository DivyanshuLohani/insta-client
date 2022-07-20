import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <Routes>
      {/* NOT PROTECTED ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      <Route path="/" element={<Layout />}>
        <Route path="/users/*" element={<Profile />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="" element={<Home />}></Route>
        </Route>

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
