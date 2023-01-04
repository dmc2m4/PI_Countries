import React from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../redux/actions";
import styles from "./paginated.module.css"

export default function Paginado({ page, maxPage }) {

    const dispatch = useDispatch()

    const nextPage = () => {
        if (page < maxPage) {
            dispatch(changePage(page * 1 + 1))
        }
    }

    const prevtPage = () => {
        if (page > 1) {
            dispatch(changePage(page * 1 - 1))
        }
    }
    return (
        <div className={styles.content}>
            <button onClick={prevtPage} className={styles.buttonback}></button>
            <h4 className={styles.font}>{page}/{maxPage}</h4>
            <button onClick={nextPage} className={styles.buttonnext}></button>
        </div>
    )
}