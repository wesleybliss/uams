'use strict'

module.exports = User => {
    
    const readController = require('./read')(User)
    
    console.warn('ehhh', readController)
    
    const login = (email, password) => new Promise((resolve, reject) => {
        
        return readController.findUserByEmail(email)
            .then(user => {
                
                if (!user) return reject('User not found')
                
                if (user.password !== password)
                    return reject('Invalid credentials')
                
                // @todo change jwt timeout
                
                resolve(user)
                
            })
        
    })
    
    
    return {
        login
    }
    
}
