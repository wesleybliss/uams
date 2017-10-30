'use strict'

module.exports = User => {
    
    const createUser = model => (new User(model)).save()
    
    
    return {
        createUser
    }
    
}
