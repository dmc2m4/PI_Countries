import React from "react";
import { Link } from "react-router-dom";
import styles from './card.module.css'

export default function Card (props) {
  console.log(props.population);
    return (
        <div className= {styles.card}>
            <h1 className = {styles.country}>{props.name} </h1>
            <Link to = {`/country/${props.id}`}>
            <img src={props.img} className = {styles.img} alt = "hola"/>
            </Link>
            <h4 className={styles.continent}>Continent:</h4>
            <h3 className = {styles.name}>{props.continent}</h3>
            <h4 className={styles.continent}>Population:</h4>
            <h3 className = {styles.name}>{props.population.toLocaleString()} habs</h3>
            <Link to = {`/country/${props.id}`}>
            <button className={styles.button}>Country detail</button>  
            </Link>      
        </div>
    )
}

