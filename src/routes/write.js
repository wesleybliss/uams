'use strict'

// user = User controller instance
module.exports = (log, app, controller) => {
    
    app.post('/users', (req, res) => {
        
        controller.createUser(req.body)
            .then(user => {
                
                if (!user)
                    return res.send(401, 'User not found')
                
                res.send(200, user)
                
            })
            .catch(err => res.send(500, new Error(err)))
    })
    
}
