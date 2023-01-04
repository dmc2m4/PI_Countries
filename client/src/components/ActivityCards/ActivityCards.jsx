import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../redux/actions";
import Loading from "../Loading/Loading";
import ActivityCard from "../ActivityCard/ActivityCard";
import Paginado from "../paginated/Paginated";
import styles from "./ActivityCards.module.css"

export default function ActivityCards () {
    const allActivities = useSelector(state => state.allActivities)
    const page = useSelector(state => state.page)
    const dispatch = useDispatch()
    const maxPage = Math.ceil(allActivities.length / 16)

    useEffect(()=>{
        dispatch(getAllActivities())
    })

    function activitiesByPage (){
        return allActivities.slice((page - 1) * 16, (((page - 1) * 16) + 16))
    }

    return <div className={styles.content}>
        <div className={styles.card}>
        {!allActivities[0]? <Loading/> : activitiesByPage().map(activity => (
            <ActivityCard
            name={activity.name}
            dificult={activity.dificult}
            duration={activity.duration}
            season={activity.season}
            key = {activity.id}
            />
        ))}
        </div>
        <div>
            <Paginado maxPage={maxPage} page={page}/>
        </div>
    </div>
    
}