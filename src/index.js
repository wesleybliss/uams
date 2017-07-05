(function() {
    
    'use strict'
    
    let log = console
    
    const seed = () => {
        
    }
    
    const authenticate = (email, password) => {
        
    }
    
    const middleware = (req, res, next) => {
        
        log.info('UAMS', req.method, req.url)
        
        next()
        
    }
    
    
    const defaultOptions = {
        log: console,
        app: null,
        mongoose: null
    }
    
    module.exports = opts => {
        
        console.info('UAMS init')
        
        const o = Object.assign(defaultOptions, opts)
        
        if (!o.app)
            throw new Error('Restify app instance required')
        
        if (!o.mongoose)
            throw new Error('Mongoose instance required')
        
        log = o.log
        
        // Models
        const User = require('./models/user')(o.mongoose)
        
        // Controllers
        const Read = require('./controllers/read')(User)
        const Write = require('./controllers/write')(User)
        
        // Routes
        require('./routes/read')(log, o.app, Read)
        require('./routes/write')(log, o.app, Write)
        
        return middleware
        
    }
    
}());