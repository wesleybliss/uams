'use strict'

module.exports = mongoose => {
    
    const schema = new mongoose.Schema({
        
        // Easily disable a user without removing their account
        active:                       { type: Boolean, required: true, default: true },
        
        lastActiveAt: Date,
        
        // Admin level of access, <= 0 === normal user)
        accessLevel:                  { type: Number, required: true, default: 0 },
        
        token: {
            value:                    String,
            expires:                  Date
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
    
    return mongoose.model('User', schema)
    
}