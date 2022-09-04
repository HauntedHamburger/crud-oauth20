const express = require('express')
const router = express.Router()
// using destructuring, bring in multiple functions from same location
const { ensureAuth, ensureGuest } = require('../middleware/auth')

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
    res.render('dashboard')
})



module.exports = router