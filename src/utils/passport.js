'use strict'

const LocalStrategy = require('passport-local').Strategy


module.exports = (options, passport) => {
    
    const { log, mongoose, userField, passField } = options
    const { User } = options.session
    const { createToken } = require('./auth')(options)
    
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    
    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        log.log('------serializeUser')
        done(null, user.id)
    })
    
    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
    
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    log.info('Init passport')
    
    passport.use('local', new LocalStrategy({
        usernameField: userField,
        passwordField: passField,
        session: false,
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, username, password, done) => {
        
        process.nextTick(() => {
            
            User.findOne({ [userField]: username }, (err, user) => {
                
                if (err) {
                    log.error(err)
                    return done(err)
                }
                
                // check to see if theres already a user with that username
                if (user) return done(null, true, { error: 'user already exists' })
                
                // if there is no user with that username create the user
                var newUser = new User()
                
                // set the user's credentials
                newUser.email = req.body.email || ''
                newUser.username = req.body.username
                newUser.password = newUser.generateHash(password)
                newUser.token = createToken(newUser.id, newUser.active, newUser.accessLevel)
                
                newUser.save(err => {
                    if (err) {
                        log.error(err)
                        throw err
                    }
                    return done(null, newUser)
                })
                
            })
            
        })
        
    }))
    
}