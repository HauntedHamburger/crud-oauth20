const express = require('express')
const passport = require('passport')
const router = express.Router()


// @desc Auth with google
// @route GET /auth/google

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile'] }))

// @desc Google auth callback
// @route GET /auth/google/callback

router.get(
    '/google/callback',
    // if auth unsucessful redirect to '/'
    passport.authenticate('google', {failuireRedirect: '/'}),
    // if auth successful respond by redirecting to '/dashboard' route
    (req, res) => {
        res.redirect('/dashboard')
    }
)

// @desc Logout user
// @route GET /auth/logout
// passport requires logout to be Async
router.get('/logout', (req,res,next) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/')
    })
})

module.exports = router