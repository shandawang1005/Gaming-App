import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Navbar = () => {
  const [user, setUser] = useState(null); // 用户信息
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Stored user:", storedUser);
      setUser(storedUser);
    }
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>

        {isAuthenticated() ? (
          <>
            <li>Welcome, {(user?.username)|| "Loading..." }</li>{" "}
            {/* 动态显示用户名 */}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
