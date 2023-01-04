import Card from "../Card/Card";
import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries, orderCountriesByname, resetDetail, orderCountriesByPopulation, filteredByContinent, changePage } from "../../redux/actions";
import styles from './cards.module.css'
import Paginado from "../paginated/Paginated";
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchBar"

export default function Cards() {
    const allCountries = useSelector(state => state.allCountries)
    const dispatch = useDispatch()
    const page = useSelector(state => state.page)
    const maxPage = Math.ceil(allCountries.length / 10)

    function filteredCountries() {
        return allCountries.slice((page - 1) * 10, (((page - 1) * 10) + 10))
    }

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(resetDetail());
    }, [dispatch])

    function alphabeticallyOrder (e){
        dispatch(orderCountriesByname(e.target.value))
        dispatch(changePage(1))
    }

    function orderedByPopulation (e){
        dispatch(orderCountriesByPopulation(e.target.value))
        dispatch(changePage(1))
    }

    function filterCountriesByContinent (e){
        dispatch(filteredByContinent(e.target.value))
        dispatch(changePage(1))
    }

    // function resetAllCountries () {

    //     dispatch(getAllCountries())
    // }

    return <div className={styles.content}>

        <div className={styles.selectors}>
            <SearchBar/>
        {/* <button onClick={resetAllCountries}>All countries</button> */}
        <h1 className={styles.titulo}>Order and filter countries:</h1>
        <div className={styles.caja}>
            <select name = "order" onChange={e => alphabeticallyOrder(e)}>
                <option value="" selected disabled hidden>Order by name</option>
                <option value ="allCountries">Order by name</option>
                <option value = "Ascending">Alphabetically ascending</option>
                <option value = "Descending">Alphabetically descending</option>
            </select>
        </div>
        <div className={styles.caja}>
            <select name = "orderByPopulation" onChange={e => orderedByPopulation(e)}>
                <option value="" selected disabled hidden>Order by population</option>
                <option value ="allCountries">Order by population</option>
                <option value = "Ascending">Ascending</option>
                <option value = "Descending">Descending</option>
            </select>
        </div>
        <div className={styles.caja}>
            <select name = "filteredByContinent" onChange={e => filterCountriesByContinent(e)}>
                <option value="" selected disabled hidden>Filtered by continent</option>
                <option value ="allCountries">Default</option>
                <option value = "Europe">Europe</option>
                <option value = "Asia">Asia</option>
                <option value = "Africa">Africa</option>
                <option value = "North America">North America</option>
                <option value = "South America">South America</option>
                <option value = "Oceania">Oceania</option>
                <option value = "Antarctica">Antarctica</option>
            </select>
        </div>
        </div>
        <div className={styles.cards}>
        {!allCountries[0]? <Loading /> : filteredCountries().map(country => (
            <Card
                name={country.name}
                img={country.img}
                continent={country.continent}
                population={country.population}
                key={country.id}
                id={country.id}
            />
        ))}
        <div className={styles.page}>
        <Paginado maxPage={maxPage} page={page} />
        </div>
        </div>
    </div>
}

