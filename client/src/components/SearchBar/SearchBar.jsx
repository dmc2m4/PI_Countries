import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, searchCountry } from "../../redux/actions";
import styles from './searchBar.module.css'


export default function SearchBar() {
    const [country, setCountry] = useState("")
    const dispatch = useDispatch()
    const countryBackUp = useSelector(state => state.countryBackUp)
    
    function handleInput (e){
        e.preventDefault()
        setCountry(e.target.value)
    }

    function findCountry (){
        const filtrado = countryBackUp.filter(countries => countries.name.toUpperCase().includes(country.toUpperCase()))
        if(!filtrado.length){
            return alert('No se encontró el pais solicitado')
        }
        dispatch(changePage(1))
        dispatch(searchCountry(country))
    }
    
    return (
       <div className={styles.search}>
          <input value={country} type = 'search' onChange = {handleInput} className={styles.input}></input>
          <button onClick={findCountry} className={styles.button}>Search country</button>
       </div>
    );
 }