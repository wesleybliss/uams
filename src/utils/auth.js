'use strict'

const jwt = require('jsonwebtoken')

module.exports = options => {
    
    const { jwtTokenSecret, jwtExpiresIn, excludeDbFields } = options
    
    return {
        
        /**
         * Create a new JWT token
         * 
         * @param  {String}  userId      User ID
         * @param  {Boolean} active      If the user is "active"
         * @param  {Number}  accessLevel User's access level
         * @return {Object}              JWT
         */
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
        
        /**
         * Sanitize a model by removing sensitive fields.
         * 
         * @todo   This does not recursively go into child objects
         * @param  {Object} model        Mongoose model instance (or POJO)
         * @param  {Array}  [keepFields] Fields to keep
         * @return {Object}              Mongoose motel instance (or POJO)
         */
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
