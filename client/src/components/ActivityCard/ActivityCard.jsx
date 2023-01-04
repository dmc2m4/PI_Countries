import React from "react";
import styles from "./ActivityCard.module.css"
import image from "../../asses/world.png"

export default function ActivityCard (props){

    return (
        <div className={styles.card}>
            <h3 className={styles.name}>{props.name}</h3>
            <img src={image} className = {styles.img} alt = "hola"/>
            <span className={styles.span}>Dificult level</span>
            <h3 className={styles.description}>{props.dificult}</h3>
            <span className={styles.span}>Duration time (hr)</span>
            <h3 className={styles.description}>{props.duration}</h3>
            <span className={styles.span}>season</span>
            <h3 className={styles.description}>{props.season}</h3>
        </div>
    )
}