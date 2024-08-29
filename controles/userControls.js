const users = require("../models/usersModel")
const jwt=require('jsonwebtoken')

//register
exports.register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json('account already exist...! please login')
        }
        else {
            const newUser = new users({
                username, email, password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
}

//login
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user=await users.findOne({email,password})
        if(user){
            const token=jwt.sign({uid:user._id},process.env.JWT_KEY)
            res.status(200).json({user,token})
        }
        else{
            res.status(401).json('incorrect email or password')
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
}