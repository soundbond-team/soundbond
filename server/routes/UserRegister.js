const { Router } = require('express');
const controllers = require('../controllers/user.controller');
const router = Router();
router.get('/', (req, res) => res.send('This is root!'))
router.post('/users', controllers.createUser)
module.exports = router


router.get('/users', controllers.getAllUsers)
router.get('/users/:id',controllers.getUserById)
router.put('/users/:id', controllers.updateUser)
router.delete('/users/:id', controllers.deleteUser)