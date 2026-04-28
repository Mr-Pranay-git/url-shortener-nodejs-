const express = require('express');
const { handleUserSignup, handleUserLogedin } = require('../controller/user')

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogedin)


module.exports = router;