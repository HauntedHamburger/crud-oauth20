const express = require('express')
const router = express.Router()
// using destructuring, bring in multiple functions from same location
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc Login/landing
// @route GET /

router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login',
    })
})

// @desc Dashboard
// @route GET /dashboard

router.get('/dashboard', ensureAuth, (req,res) => {
    console.log(req.user)
    res.render('dashboard', {
        name: req.user.firstName,
    })
})

// @desc Dashboard
// @route GET /dashboard

router.get('/dashboard', ensureAuth, (req,res) => {
    console.log(req.user)
    res.render('dashboard', {
        name: req.user.firstName,
    })
})



module.exports = router