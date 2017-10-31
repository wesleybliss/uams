'use strict'

module.exports = {
    
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
        apnsDeviceTokens: [String]
    },
    
    android: {
        firebasePushTokens: [String]
    }
    
}
