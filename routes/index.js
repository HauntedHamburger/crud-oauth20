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

router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        // ,lean() tells Mongoose to skip instantiating a full document and provide JSON objects (or plain old JS objects)
        // necessary to hydrate handlebars as it only accepts javascript objects
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })

    } catch (err) {
        console.err(err)
        res.render('error/500')
    }
})



module.exports = router