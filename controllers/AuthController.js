const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error:err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User registered successfully !'
            })
        })
        .catch(error => {
            res.json({
                message: 'an error occured when trying to register'
            })
        })
    })

}

const login =  (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email: username}, {phone: username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, env.ACCESS_TOKEN, {expiresIn: env.TOKEN_EXPIRE_TIME})
                    let refreshtoken = jwt.sign({name: user.name}, env.REFRESH_TOKEN, {expiresIn: env.REFRESH_TOKEN_EXPIRE_TIME})   
                    res.json({
                        message: 'Login Successful',
                        token,
                        refreshtoken
                    })
                } else{
                    res.json({
                        message: 'Incorrect password'
                    })
                }
            })
        }else {
            res.json({
                message: 'User not found'
            })
        }
    })
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'refreshsecretValue', function(err, decode){
        if(err){
            res.status(401).json({
                err
            })
        } else{
            let token = jwt.sign({name: decode.name}, 'secretValue', {expiresIn: '3h'})
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: "Token refreshed successfully", 
                token, 
                refreshToken
            })
        }
    })
}

module.exports = {
    register, login, refreshToken
}