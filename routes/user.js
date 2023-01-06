const { Router } = require('express');
const { 
    getUsers, 
    putUser, 
    postUser, 
    deleteUser,
    patchUser 
} = require('../controllers/user');

const router = Router();

router.get('/', getUsers);

router.put('/:id', putUser);

router.post('/', postUser);

router.delete('/', deleteUser);

router.patch('/', patchUser )

module.exports = router;