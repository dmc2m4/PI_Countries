const { Router } = require('express')
const { getAllCountries, getCountriesWithTuristActivities} = require('../Controllers/controllers')

const countryRouter = Router()

countryRouter.get('/', async (req, res) => {
    try {
        const {name}= req.query
        const result = await getAllCountries()
        if(name){
            const countryByName = result.filter(p => p.name.toUpperCase() === name.toUpperCase())
            if (countryByName.length) {
                return res.status(200).json(countryByName)
            }else {
                return res.status(400).send('No se encontró el país solicitado')
            }
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

countryRouter.get("/:id", async (req, res) => {
    try{
        let {id} = req.params;
        id = id.toUpperCase()
        await getAllCountries()
        if(id){
            const countryById = await getCountriesWithTuristActivities(id);
            if(countryById){
                return res.status(200).json(countryById)
            }else {
                return res.status(400).send('No se encontró el país solicitado')
            }
        }
    }catch(error){
        res.status(400).send({error: error.message})
    }
})


module.exports = countryRouter