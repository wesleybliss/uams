'use strict'
const bcrypt = require('bcrypt-nodejs')

module.exports = mongoose => {
    
    const schema = new mongoose.Schema({
        
        // Easily disable a user without removing their account
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        
        lastActiveAt: Date,
        
        // Admin level of access, <= 0 === normal user)
        accessLevel: {
            type: Number,
            required: true,
            default: 0
        },
        
        // JWT
        token: String,
        
        email: String,
        username: String,
        password: {
            type: String,
            required: true
        },
        
        ios: {
            apnsDeviceTokens:         [String]
        },
        
        android: {
            firebasePushTokens:       [String]
        }
        
    }, { timestamps: true } )
    
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