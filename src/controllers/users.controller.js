'use strict'

const passport = require('passport')

module.exports = options => {
    
    const { log, app, mongoose, userField } = options
    const { createToken, sanitizeModel } = require('../utils/auth')(options)
    const { User } = options.session
    
    return {
        
        signup: (req, res, next) => {
            
            passport.authenticate('local', (err, user, info) => {
                
                if (err) return res.send(500, err)
                if (user === true) return res.send(401, { error: 'User already exists' })
                
                const username = user.username || user.email
                
                return res.send(200, {
                    message: `User ${username} created`,
                    data: {
                        user: sanitizeModel(user)
                    }
                })
                
            })(req, res, next)
            
        },
        
        login: (req, res, next) => {
            
            const invalidMessage = 'Invalid username or password'
            
            if ((!req.body.username && !req.body.email) || !req.body.password)
                return res.send(401, { message: invalidMessage })
            
            const username = req.body.username || req.body.email
            
            User.findOne({ [userField]: username }, (err, user) => {
                
                if (err) res.send(500, { message: err })
                
                if (!user || !user.validPassword(req.body.password))
                    return res.send(401, { message: invalidMessage })
                
                try {
                    jwt.verify(user.token, config.tokenSecret)
                    log.info('Reusing existing token for user', username)
                }
                catch (e) {
                    // If the existing token is no longer valid, create a new one
                    user.token = createToken(username, user.active, user.accessLevel)
                }
                
                user.save(err => {
                    
                    if (err) {
                        log.error('LOGIN', 'Error updating user token', err)
                        return res.send(500, err)
                    }
                    
                    log.info('Updated token for', username)
                    
                    res.send(200, {
                        message: `User ${username} signed in`,
                        data: {
                            user: sanitizeModel(user)
                        }
                    })
                    
                })
                
            })
            
        }
        
    }
    
}