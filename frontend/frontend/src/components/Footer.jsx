import {React} from "react"
import { Link } from "react-router-dom";

export default function Footer() {
  const navItems = [
    { name: "Home", path: "/", status: true },
    { name: "Books", path: "/books", status: true },
  ];

  return (
    <footer className="bg-orange-500 text-white shadow-xl text-center py-4 w-full mt-auto">
      <nav>
        {navItems.map((item) => (
          <span key={item.name} className="mx-4">
            <Link to={item.path}>{item.name}</Link>
          </span>
        ))}
      </nav>
    </footer>
  );
}
