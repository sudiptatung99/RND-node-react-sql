const express = require("express");
const { GetAllUser, Register, Login } = require("../controller/UserController");
const router = express.Router();


router.get('/all-user',GetAllUser);
router.post('/register',Register);
router.post('/login',Login);


module.exports = router;