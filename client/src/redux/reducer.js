import { GET_ALL_COUNTRIES, COUNTRY_BY_NAME, SEARCH_COUNTRY, CHANGE_PAGE, RESET_DETAIL, ORDER_BY_NAME, RESET_COUNTRIES, ORDER_BY_POPULATION, FILTER_BY_CONTINENT, GET_ALL_ACTIVITIES } from "./actions"

const initialState = {
    allCountries: [],
    countryBackUp :[],
    countriesDetail : [],
    allActivities: [],
    activitiesBackUp:[],
    page:1
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload, 
                countryBackUp: action.payload
            }
        case COUNTRY_BY_NAME:
            return {
                ...state,
                countriesDetail: action.payload
            }
        case SEARCH_COUNTRY:
        return {
            ...state,
            allCountries: [...state.countryBackUp].filter(country => country.name.toUpperCase().includes(action.payload.toUpperCase()))
        }
        case CHANGE_PAGE:
            return{
                ...state,
                page:action.payload

            }
            case RESET_DETAIL:
            return{
                ...state,
                countriesDetail:action.payload

            }
            case RESET_COUNTRIES:
            return{
                ...state,
                allCountries: []

            }
            case ORDER_BY_NAME:
                let countriesOrderByName = [...state.allCountries];
                if(action.payload === "Ascending"){
                    countriesOrderByName.sort((a, b) => a.name.localeCompare(b.name))
                }else if (action.payload === "Descending"){
                    countriesOrderByName.sort ((a, b) => b.name.localeCompare(a.name))
                }else if (action.payload === "allCountries"){
                    countriesOrderByName = [...state.countryBackUp]
                }
            return{
                ...state,
                allCountries: [...countriesOrderByName]

            }
            case ORDER_BY_POPULATION:
                let orderCountriesByPopulation = [...state.allCountries];
                if(action.payload === "Ascending"){
                    orderCountriesByPopulation.sort((a, b) => a.population - b.population)
                }else if (action.payload === "Descending"){
                    orderCountriesByPopulation.sort ((a, b) => b.population - a.population)
                }else if (action.payload === "allCountries"){
                    orderCountriesByPopulation = [...state.countryBackUp]
                }
            return{
                ...state,
                allCountries: [...orderCountriesByPopulation]

            }
            case FILTER_BY_CONTINENT:
                if (action.payload=== "allCountries"){
                    return{
                        ...state,
                        allCountries: [...state.countryBackUp]
                    }
                }
                return {
                    ...state,
                    allCountries: [...state.countryBackUp].filter(country => country.continent.toUpperCase() === action.payload.toUpperCase())
                }
            case GET_ALL_ACTIVITIES:
                return {
                    ...state,
                    allActivities: action.payload,
                    activitiesBackUp: action.payload
                }
        default:
            return { ...state }
    }
}