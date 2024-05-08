const express = require('express');
const router = express.Router();
const {home} = require("../controller/auth-controller")
const {register} = require("../controller/auth-controller")
const {login} = require("../controller/auth-controller")

// router.get('/',(req,res)=>{
//     res.send('api started with auth-router')
// })

router.route("/").get(home)

router.route("/register").post(register)
router.route("/login").post(login)

module.exports = router;