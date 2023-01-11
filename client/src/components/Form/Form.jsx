import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActivity, getAllCountries } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import styles from "./form.module.css"
import image from "../../asses/tourist.jpg"


export default function Form() {
    const dispatch = useDispatch()
    const allCountries = useSelector(state => state.allCountries)
    const navigate = useNavigate()
    const [newActivity, setNewActivity] = useState({
        name: "",
        dificult: 0,
        duration: 0,
        season: "",
        countries: []
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])

    console.log(newActivity.countries);
    console.log(newActivity);

    const handleInputChange = (e) => {
        setErrors(
            validation({
                ...newActivity,
                [e.target.name]: e.target.value

            }))

        setNewActivity({
            ...newActivity,
            [e.target.name]: e.target.value
        })
    }

    const handleInputChange2 = (e) =>{
        setNewActivity({
            ...newActivity,
            season: e.target.value
        })
    }

    function addMoreCountries(e) {
        setNewActivity({
            ...newActivity,
            countries: [...new Set([...newActivity.countries, e.target.value])]
        })
    }

    function validation(input) {
        let errors = {}
        if (input.name.length === 0) errors.name = "Required field"
        if (input.dificult.length === 0) errors.dificult = "Required field"
        if (input.duration.length === 0) errors.duration = "Required field"
        if (input.season.length === 0) errors.season = []
        if (input.dificult < 0 || input.dificult > 5) errors.dificult = "The difficulty must be between 1 and 5"
        if (input.duration === 0 || input.duration > 24) errors.duration = "The duration must be between 1hr and 24hr"

        return errors
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!newActivity.name || !newActivity.duration || !newActivity.dificult || !newActivity.season || !newActivity.countries.length) {
            return alert("Por favor completar todos los campos")
        }
        dispatch(addActivity(newActivity));
        alert("La actividad se creó correctamente")
        navigate("/Home")
    }
    
    console.log(newActivity);

    function deleteCountrie(name) {
        setNewActivity({
            ...newActivity,
            countries: newActivity.countries.filter(country => country !== name)
        })
    }

    return <div className={styles.content}>
        <img alt="tourist" src={image} className={styles.img}></img>
        <div className={styles.form}>
            <h1 className={styles.tittle}>Create a new tourist activity</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className={styles.labels}>Name: </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        className={styles.inputs}></input>
                    <br />
                    {errors.name && (<p className={styles.errors}>{errors.name}</p>)}
                </div>
                <div>
                    <label className={styles.labels}>Dificult: </label>
                    <input
                        type="number"
                        name="dificult"
                        min="1"
                        max="5"
                        onChange={handleInputChange}
                        className={styles.inputs}></input>
                    <br />
                    {errors.dificult && (<p className={styles.errors}>{errors.dificult}</p>)}
                </div>
                <div>
                    <label className={styles.labels}>Duration: </label>
                    <input
                        type="number"
                        name="duration"
                        min="1"
                        max="24"
                        onChange={handleInputChange}
                        className={styles.inputs}></input>
                    <br />
                    {errors.duration && (<p className={styles.errors}>{errors.duration}</p>)}
                </div>
                <div>
                    <select onChange={handleInputChange2} name="seasons" className={styles.selector}>
                        <option value="" selected disabled hidden>Select season</option>
                        <option value="all seasons">All seasons</option>
                        <option value="summer">Summer</option>
                        <option value="spring">Spring</option>
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                    </select>
                    <br />
                    {errors.season && (<p className={styles.errors}>{errors.season}</p>)}
                </div>
                <div>
                    <select onChange={addMoreCountries} name="countries" className={styles.selector}>
                        <option value="" selected disabled hidden>
                            Select countries
                        </option>
                        {allCountries.map(country =>
                            <option value={country.name}>{country.name}</option>
                        )}
                    </select>
                </div>
                <div className={styles.list}>
                    {newActivity.countries?.length?  newActivity.countries.map(country =>
                        <li className={styles.countries}>{country}
                        <button 
                        onClick={e => deleteCountrie(e.target.value)} 
                        value={country}
                        className={styles.cancel}>X</button>
                        </li>
                    ):""}
                </div>
                <button type="submit" className={styles.submit}>Post  activity</button>
            </form>
        </div>
    </div>
}

