'use strict'

const passport = require('passport')

module.exports = options => {
    
    const { log, app, mongoose, userField } = options
    const { createToken, sanitizeModel } = require('../utils/auth')(options)
    const { User } = options.session
    
    return {
        
        signup: (req, res, next) => {
            
            // @todo Add reCAPTCHA validation
            
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
            
        }, // signup
        
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
            
        }, // login
        
        update: (req, res, next) => {
            
            log.info('Looking up user w/token', req.token)
            
            if (!req.body || Object.keys(req.body).length < 1)
                return res.send(412, { message: 'No update params received' })
            
            if (req.body && req.body.password && req.body.password.length < 8)
                return res.send(417, { message: 'Password must be 8 characters or more' })
            
            const restrictedFields = ['_id', 'id', '__v', 'token']
            
            restrictedFields.forEach(field => {
                if (req.body.hasOwnProperty(field)) {
                    log.warn(`Omitting "${field}" field from updates`)
                    delete req.body[field]
                }
            })
            
            if (req.body.password)
                req.body.password = user.generateHash(req.body.password)
            
            log.info('Updating user with params', req.body)
            
            User.findOneAndUpdate({ token: req.token }, req.body, { new: true }, (err, user) => {
                if (err) return res.send(500, { message: 'Failed to update account'})
                res.send(200, { data: { user: sanitizeModel(user) }})
            })
            
        }, // update
        
        fetch: (req, res, next) => {
            
            log.info('Looking up user w/token',
                req.token.substring(0, 4) + '...' +
                req.token.substring(req.token.length - 4))
            
            User
                .findOne({ token: req.token })
                .exec()
                .then(user => {
                    if (!user) {
                        log.warn('get /users - no user found')
                        return res.send(404, { message: 'user not found' })
                    }
                    user = sanitizeModel(user)
                    log.info('Found user', user.username || user.email)
                    res.send(200, { data: { user }})
                })
                .catch(err => {
                    res.send(500, { message: 'Error ' + err })
                })
            
        }
        
    }
    
}