'use strict'

module.exports = User => {
    
    const findUser = (field, val) => User.find({ [field]: val }).exec()
    
    const findUserById = id => findUser('_id', val)
    
    
    return {
        findUser,
        findUserById
    }
    
}
