import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice"; // 
import {useNavigate} from "react-router-dom"

export default function Header() {
  const status = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", status: true },
    { name: "Books", path: "/books", status: true },
    { name: "Login", path: "/login", status: !status },
  ];

  return (
    <header className="bg-orange-400 text-white">
      <nav className="flex items-center">
        {navItems.map(
          (item) =>
            item.status && (
              <div key={item.name} style={{ margin: "10px", display: "inline-block" }}>
                <Link to={item.path}>{item.name}</Link>
              </div>
            )
        )}

        {status && (
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
