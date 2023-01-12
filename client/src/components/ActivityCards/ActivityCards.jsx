import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getAllActivities, deleteActivity } from "../../redux/actions";
import Loading from "../Loading/Loading";
import ActivityCard from "../ActivityCard/ActivityCard";
import Paginado from "../paginated/Paginated";
import styles from "./ActivityCards.module.css";
import swal from "sweetalert";

export default function ActivityCards () {
    const allActivities = useSelector(state => state.allActivities)
    const page = useSelector(state => state.page)
    const dispatch = useDispatch()
    const maxPage = Math.ceil(allActivities.length / 16)

    useEffect(()=>{
        dispatch(getAllActivities())
        dispatch(changePage(1))
    },[dispatch])

    function activitiesByPage (){
        return allActivities.slice((page - 1) * 16, (((page - 1) * 16) + 16))
    }

    async function deleteActivities (activity) {
        const deleteAlert = await swal({
            tittle: "DELETE ACTIVITY",
            text: "are you sure that do you want to delete this activity?",
            icon: "warning",
            buttons: ["no", "yes"]
        })
        if(deleteAlert){
            dispatch(deleteActivity(activity))
        }
        
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
            deleteActivities={deleteActivities}
            />
        ))}
        </div>
        <div>
            <Paginado maxPage={maxPage} page={page}/>
        </div>
    </div>
    
}