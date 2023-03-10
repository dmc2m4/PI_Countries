const axios = require('axios')
const { Country, Activity } = require('../db.js')


const getAllCountriesByRestcountries = async function () {
    let countries = axios.get('https://restcountries.com/v3/all')
        .then(res => res.data.map(country => {
            return {
                id: country.cca3,
                name: country.name.common,
                img: country.flags[1],
                continent: country.continents[0],
                capital: country.capital ? country.capital[0] : 'Este pais no tiene capital',
                subregion: country.subregion,
                area: country.area,
                population: country.population
            }
        }))
    const countriesFor = await countries
    await Country.bulkCreate(countriesFor)
}

const getAllCountriesByDb = async function () {
    let countries = await Country.findAll()
    return countries
}

const getAllCountries = async function () {
    let dbCountries = await getAllCountriesByDb()
    if (dbCountries.length) {
        return dbCountries
    }
    await getAllCountriesByRestcountries()
    dbCountries = await getAllCountriesByDb()
    return dbCountries
}

const getCountriesWithTouristActivities = async function (id) {
    const touristActivities = await Country.findByPk(id, {
        include: {
            model: Activity
        }
    })
    return touristActivities
}

const createtNewActivity = async function (value) {
    const searchingActivity = await Activity.findAll({
        where: {
            name: value.name.toUpperCase()
        }
    })
    if (searchingActivity.length) throw new Error('Esta actividad turistica ya existe')
    const newActivity = await Activity.create(value)
    const countriesByActivities = await Country.findAll({
        where: {
            name: value.countries
        }
    })
    newActivity.addCountries(countriesByActivities)
    return newActivity
}

const getAllActivities = async function () {
    const activities = await Activity.findAll({ include: { model: Country } })
    return activities
}

const deleteActivity = async function (name){
    console.log(name);
     await Activity.destroy({where: {name}})
}

module.exports = {
    deleteActivity,
    getAllCountries,
    getCountriesWithTouristActivities,
    createtNewActivity,
    getAllActivities
}