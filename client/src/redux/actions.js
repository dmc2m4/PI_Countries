import axios from 'axios';
import {API_URL} from "../config.js" ;
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const COUNTRY_BY_NAME = 'COUNTRY_BY_NAME'
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const RESET_DETAIL = 'RESET_DETAIL'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const RESET_COUNTRIES = 'RESET_COUNTRIES'
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES"



export const getAllCountries = () => {
    return function (dispatch) {
        return fetch(`${API_URL}/country`)
            .then(response => response.json())
            .then((data) => {
                dispatch({
                    type: GET_ALL_COUNTRIES,
                    payload: data
                })
            })
    }
};

export const detailCountry = (id) => {
    return function (dispatch) {
        return fetch(`${API_URL}/country/${id}`)
        .then((response) => response.json())
        .then ((data) => {
                dispatch({
                    type: COUNTRY_BY_NAME,
                    payload: data
                })
        })

    }
}

export const searchCountry = (name) => {
    return {
        type: SEARCH_COUNTRY,
        payload: name
    }
}

export const changePage = (page) => {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}

export const resetDetail = () => {
    return {
        type: RESET_DETAIL,
        payload: []
    }
}
export const resetCountries = () => {
    return {
        type: RESET_COUNTRIES,
    }
}

export const orderCountriesByname = (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order

    }
}
export const orderCountriesByPopulation = (order) => {
    return {
        type: ORDER_BY_POPULATION,
        payload: order
    }
}
export const filteredByContinent = (filter) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: filter
    }
}

export const addActivity = (activity) => {
    return async function (){
        const response = await axios.post (`${API_URL}/activities`, activity);
        return response
    }
}

export const getAllActivities = () => {
    return function (dispatch) {
        return fetch(API_URL + '/activities')
            .then(response => response.json())
            .then((data) => {
                dispatch({
                    type: GET_ALL_ACTIVITIES,
                    payload: data
                })
            })
    }
};

export const deleteActivity = (activity) => {
    return async function (){
        await axios.delete (`${API_URL}/activities`, activity);  
    }
}

