'use strict'
const errors = require('restify-errors')

// user = User controller instance
module.exports = (log, app, controller) => {
    
    app.post('/users/login', (req, res) => {
        
        controller.login(req.body.email, req.body.password)
            .then(user => {
                
                if (!user)
                    return res.send(new errors.ResourceNotFoundError('User not found'))
                
                res.send(200, user)
                
            })
            .catch(err => {
                
                log.error(err)
                res.send(new errors.InternalError(err))
                
            })
        
    })
    
}
