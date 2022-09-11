const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

// load config
dotenv.config({ path: './config/config.env' })

// passport config -- pass (passport) as an argument
require('./config/passport')(passport)

connectDB()

const app = express()

// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(methodOverride(function (req,res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method
        delete req.body._method
        return method 
    }
}))

// logging
if (process.env.NODE_ENV = 'development') {
    app.use(morgan('dev'))
}

// handlebars helpers

const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')


// handlebars
// declare default layout as main
// add the word .engine after exphbs
app.engine(
    '.hbs', 
    //!Change: add '.engine' after exphbs
    exphbs.engine({
        helpers: {
            formatDate,
            stripTags,
            truncate,
            editIcon,
            select
        },
        defaultLayout: 'main',
        extname: '.hbs'
    })
);
app.set('view engine', '.hbs')

// session middleware
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        })
    })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())
 
// global user variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// static folder
// __dirname goes to public folder
app.use(express.static(path.join(__dirname, 'public')))


////////////////////////
// <---- Routes ----> //
////////////////////////

app.use('/', require('./routes/index'))
app.use('/dashboard', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))


const PORT = process.env.PORT || 8500
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`))