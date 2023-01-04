import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css"
import image from "../../asses/logo.png"

export default function NavBar() {


    return <div className={styles.content}>
        <div >
            <img src={image} alt="" className={styles.logo}/>
        </div>
        <div className={styles.links}>
            <Link to="/activities">
            <button className={styles.all}>All activities</button>
            </Link>
            <Link to="/newActivity">
            <button className={styles.create}>Create new activity</button>
            </Link>
            <Link to="/Home">
            <button className={styles.home}>🏠Home</button>
            </Link>
        </div>
    </div>
}