'use strict'

module.exports = User => {
    
    const createUser = model => (new User(doc)).save()
    
    
    return {
        createUser
    }
    
}
