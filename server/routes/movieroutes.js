const express = require('express');
const router = express.Router();
const moviecontroller = require('../controller/moviecontroller');

router.post('/',moviecontroller.createmovie);
// router.get('/submits',userController.getall);
// router.get('/users/:id', userController.getsingle);
// router.put('/userupdate/:id',userController.userupdate);
// router.delete('/deleteuser/:id',userController.deleteuser)


module.exports = router;