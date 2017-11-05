'use strict'
const jwt = require('jsonwebtoken')
const parseBearerToken = require('parse-bearer-token')

module.exports = options => {
    
    const { log, app, jwtTokenSecret } = options
    
    return {
        
        authRoute: (req, res, next) => {
            
            // check header or url parameters or post parameters for token
            const token = parseBearerToken(req)
            
            // decode token
            if (token) {
                
                // verifies secret and checks exp
                jwt.verify(token, jwtTokenSecret, (err, decoded) => {
                    
                    if (err) {
                        log.error('Failed to authenticate token,', token, err)
                        return res.send(401, {
                            message: 'Failed to authenticate token.'
                        })
                    }
                    
                    // if everything is good, save to request for use in other routes
                    req.token = token
                    req.decodedToken = decoded
                    next()
                    
                })
                
            }
            else {
                
                // if there is no token
                // return an error
                console.error('No token provided')
                res.send(403, {
                    message: 'No token provided.'
                })
                
            }
            
        }
        
    }
    
}
