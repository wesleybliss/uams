(function() {
    
    'use strict'
    
    let log = console
    
    const seed = () => {
        
    }
    
    const authenticate = (email, password) => {
        
    }
    
    const middleware = (req, res, next) => {
        
        console.info(req.method, req.url)
        
        next()
        
    }
    
    
    const defaultOptions = {
        log: console,
        mongoose: null
    }
    
    module.exports = opts => {
        
        const o = Object.assign(defaultOptions, opts)
        
        if (!o.mongoose)
            throw new Error('Mongoose instance required')
        
        log = o.log
        
        return middleware
        
    }
    
}());