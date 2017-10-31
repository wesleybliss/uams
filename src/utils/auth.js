'use strict'

const jwt = require('jsonwebtoken')

module.exports = options => {
    
    const { jwtTokenSecret, jwtExpiresIn, excludeDbFields } = options
    
    return {
        
        createToken: (userId, active, accessLevel) => {
            
            const payload = {
                userId,
                active,
                accessLevel
            }
            
            return jwt.sign(payload, jwtTokenSecret, {
                expiresIn: jwtExpiresIn
            })
            
        },
        
        // @todo this does not recursively go into child objects
        sanitizeModel: (model, keepFields = []) => {
            
            if (!(keepFields instanceof Array))
                keepFields = []
            
            try { model = model.toObject() }
            catch (e) {}
            
            Object.keys(model).forEach(k => {
                if (!keepFields.includes(k)
                    && excludeDbFields.includes(k))
                    delete model[k]
            })
            
            return model
            
        }
        
    }
    
}
