const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).json({err: "Paramètre manquant"})
    const check = await User.findOne({email: req.body.email})
    if (check)
        return res.status(403).json({err: "Email existant"})
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const client = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            age: req.body.age
        });
        client.save()
        .then(() => res.status(201).json({client}))
        .catch(err => res.status(500).json({err}))
    }).catch(err => res.status(500).json({err}))
}


exports.login = async (req, res, next) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).json({err: "Paramètre manquant"})

    const check = await User.findOne({email: req.body.email})
    if (!check)
        return res.status(400).json({err: "User not found"})
   
    const result = await bcrypt.compare(req.body.password, check.password)
    
    if (!result)
        return res.status(403).json({err: "invalid password"})

    var data = {
        id: check._id,
        token: jwt.sign(
            {userID: check._id},
            "TOKEN",
            {expiresIn: '24h'}
        )
    }
    return res.status(200).json({data})
}

exports.me = async (req, res, next) => {
    if (!req.params.id)
        return res.status(400).json({err: "Paramètre manquant"})
    const user = await User.findOne({_id: req.params.id})
    if (!user)
        return res.status(400).json({err: "User not found"})
    return res.status(200).json(user)
}

exports.authme = async (req, res, next) => {
    const user = await User.findOne({_id: res.locals.user})
    if (!user)
        return res.status(400).json({err: "User not found"})
    return res.status(200).json(user)
}

exports.update = async (req, res, next) => {
    if (!req.body.firstname || !req.body.lastname)
        return res.status(400).json({err: "Paramètre manquant"})
    User.updateOne({_id: res.locals.user}, {
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        }
    }).then(() => {
        res.status(201).json({msg: "ok"})
    }).catch(err => res.status(400).json({err}))
}