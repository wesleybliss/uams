'use strict'
const bcrypt = require('bcrypt-nodejs')

module.exports = (mongoose, modelDefinition) => {
    
    const schema = new mongoose.Schema(modelDefinition, { timestamps: true } )
    
    // Example custom method
    schema.methods.isPrivileged = () => {
        return this.active && this.accessLevel > 0
    }
    
    schema.methods.generateHash = password =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

    schema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password)
    }
    
    schema.pre('save', function(next) {
        if ((!this.email || this.email.length < 1) &&
            (!this.username || this.username.length < 1))
            throw new Error('Either "email" or "username" is required')
        next()
    })

    
    return mongoose.model('User', schema)
    
}