const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const jwtSecret="MynameisShreyaMittalIamfromAgraIliketoplaygamesanddocoding"

router.post("/createuser", [
    body('email').isEmail(),
    body('name', 'Name must be 5 character long').isLength({ min: 5 }),
    body('password', 'Name must be 8 character long').isLength({ min: 8 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt) 
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            }).then(res.json({ success: true }))
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Name must be 8 character long').isLength({ min: 8 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData)
                return res.status(400).json({ errors: "Wrong Credentials" })
            const passCompare=await bcrypt.compare(req.body.password,userData.password)
            if (!passCompare) {
                return res.status(400).json({ errors: "Wrong Credentials" })
            }

            const data={
                user:{
                    id:userData.id
                }
            }

            const authToken=jwt.sign(data,jwtSecret)
            return (res.json({ success: true,authToken:authToken }))
        }
        catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })
module.exports = router;