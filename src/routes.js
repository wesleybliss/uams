'use strict'

const passport = require('passport')

module.exports = options => {
    
    const { log, app, mongoose } = options
    
    log.info('Attaching Passport to app', app.name)
    //app.use(session({ secret: 'abc123' }))
    app.use(passport.initialize())
    //app.use(passport.session()) // persistent login sessions
    require('./utils/passport')(options, passport)
    app.passport = passport
    
    const controller = require('./controllers/users.controller')(options)
    
    app.post('/users', controller.signup)
    app.post('/users/login', controller.login)
    
}