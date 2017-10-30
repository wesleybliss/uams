'use strict'

const passport = require('passport')

module.exports = options => {
    
    const { log, app } = options
    const { sanitizeModel } = require('../utils/auth')(options)
    
    return {
        
        signup: (req, res, next) => {
            
            log.debug('controller signup', req.body)
            
            // process.nextTick(() => {
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
            // })
            
        }
        
    }
    
}