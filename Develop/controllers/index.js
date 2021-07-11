const router = require('express').Router(); 

const apiRoutes = require('./api'); 
const homeRoutes = require('./home'); 

router.use('/api', api); 
router.use('/', home);

module.exports = router; 