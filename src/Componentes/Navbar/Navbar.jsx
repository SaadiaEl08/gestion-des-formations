import React, {useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
const Navbar = () => {
  let [currentPath, setCurrentPath] = useState(window.location.pathname);
  return (
    <nav className={`${styles.nav} ${styles.noprint}`}>
        <div className={styles.linkContainer}>
          <Link className={styles.link} onClick={() => setCurrentPath("/")} to="/">Acceuil {currentPath == "/" ? <hr /> : ""}</Link>
          <Link className={styles.link} onClick={() => setCurrentPath("/employes")} to="/employes">Employes {currentPath == "/employes" ? <hr /> : ""}</Link>
          <Link className={styles.link} onClick={() => setCurrentPath("/formations")} to="/formations">Formations {currentPath == "/formations" ? <hr /> : ""}</Link>
          <Link className={styles.link} onClick={() => setCurrentPath("/participations")} to="/participations">Participations {currentPath == "/participations" ? <hr /> : ""}</Link>
      </div>
    </nav>
  );
};

export default Navbar;