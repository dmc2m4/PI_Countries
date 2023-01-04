import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailCountry, resetCountries } from "../../redux/actions";
import Loading from "../Loading/Loading";
import ActivityCard from "../ActivityCard/ActivityCard";
import styles from "./CountryDetail.module.css"
import Paginado from "../paginated/Paginated";


export default function CountryDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const countriesDetail = useSelector(state => state.countriesDetail)
    const page = useSelector(state => state.page)
    const maxPage = Math.ceil(countriesDetail?.activities?.length / 8)

    function activitiesByPage (){
        return countriesDetail?.activities?.slice((page - 1) * 8, (((page - 1) * 8) + 8))
    }


    useEffect(() => {
        dispatch(detailCountry(id))
        dispatch(resetCountries())
    }, [dispatch, id])

    return <div className={styles.content}>
        <div className={styles.card}>
            {!countriesDetail ? <Loading /> : <div>
                <img src={countriesDetail?.img} alt="" className={styles.img} />
                <h1 className={styles.id}>{countriesDetail?.id}</h1>
                <h1 className={styles.name}>{countriesDetail?.name}</h1>
                <h3 className={styles.description}><span className={styles.span}>Continent: </span>{countriesDetail?.continent}</h3>
                <h3 className={styles.description}><span className={styles.span}>Capital: </span>{countriesDetail?.capital}</h3>
                <h3 className={styles.description}><span className={styles.span}>Subregion: </span>{countriesDetail?.subregion}</h3>
                <h3 className={styles.description}><span className={styles.span}>Area: </span>{countriesDetail?.area} km²</h3>
                <h3 className={styles.description}><span className={styles.span}>Population: </span>{countriesDetail?.population}</h3>
            </div>}
            <div className={styles.paginated}>
            <div className={styles.activities}>
                {!countriesDetail.activities?.length ? <span className={styles.message}>This country doesn't have turist activities</span> :
                    activitiesByPage().map(activity => (
                        <ActivityCard
                            name={activity.name}
                            duration={activity.duration}
                            dificult={activity.dificult}
                            season={activity.season}
                            key={activity.id}
                        />
                    ))}
            </div>
            <div>
                {!countriesDetail.activities?.length ? null: <Paginado maxPage={maxPage} page={page} />}
            </div>
            </div>
        </div>
    </div>

}
