import React from "react";
import { Link } from "react-router-dom";
import styles from './introduction.module.css'

export default function Introduction() {
    return (
        <div className={styles.content}>
            <div className={styles.welcom}>
            <Link to="/Home">
                <div>
                <button className={styles.button}>START</button>
                </div>
            </Link>
            </div>
        </div>
    )
}