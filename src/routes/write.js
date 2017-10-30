'use strict'
const errors = require('restify-errors')

// user = User controller instance
module.exports = (log, app, controller) => {
    
    app.post('/users', (req, res) => {
        
        controller.createUser(req.body)
            .then(user => {
                
                if (!user)
                    return res.send(new errors.ResourceNotFoundError('User not created'))
                
                res.send(200, user)
                
            })
            .catch(err => res.send(new errors.InternalError(err)))
    })
    
}
