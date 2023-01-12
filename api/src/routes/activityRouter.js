const {Router} = require('express')
const {createtNewActivity, getAllActivities, deleteActivity} = require('../Controllers/controllers')


const activityRouter = Router()

activityRouter.post('/', async (req, res) => {
    try{
        const {name, dificult, duration, season, countries} = req.body

        const newActivity = await createtNewActivity({name, dificult, duration, season, countries})
        res.status(200).send(newActivity)
    }catch(error){
        res.status(400).send(error.message)
    }
})

activityRouter.get('/', async (req, res) => {
    try{
        const getActivities = await getAllActivities()
        if(getActivities) return res.status(200).json(getActivities)
        
        return res.status(400).send('La actividad turistica no existe')
    }catch(error){
        res.status(400).send(error)
    }
})

activityRouter.delete('/:name', async (req, res)=>{
    try {
        // console.log(req.params);
        const {name} = req.params;
        await deleteActivity(name)
        res.status(200).send('Actividad borrada satisfactoriamente')
    }catch(error){
        res.status(400).send(error.message)
    }
})
module.exports = activityRouter