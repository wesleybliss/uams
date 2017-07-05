'use strict'
const errors = require('restify-errors')

// user = User controller instance
module.exports = (log, app, controller) => {
    
    app.get('/users/:id', (req, res) => {
        
        controller.findUser('_id', req.params.id)
            .then(user => {
                
                if (!user)
                    return res.send(new errors.ResourceNotFoundError('User not found'))
                
                res.send(200, user)
                
            })
            .catch(err => {
                
                if (err.name && err.name === 'CastError')
                    return res.send(new errors.InvalidArgumentError(err, 'Invalid user ID'))
                
                res.send(new errors.InternalError(err))
                
            })
    })
    
}
