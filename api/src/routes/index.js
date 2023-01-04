const { Router } = require('express');

// Importar todos los routers;
const countryRouter = require('./countryRouter.js');
const activityRouter = require('./activityRouter.js');
const router = Router();

// Configurar los routers
router.use('/country', countryRouter);
router.use('/activities', activityRouter);


module.exports = router;
