import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const { logout } = useLogout();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">myMoney</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>

        <li>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
