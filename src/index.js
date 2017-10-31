(function() {
    
    'use strict'
    
    let log = console
    
    const defaultOptions = {
        log: console,
        app: null,
        mongoose: null,
        userField: 'username',
        passField: 'password',
        excludeDbFields: [],
        jwtTokenSecret: '',
        jwtExpiresIn: '24hr',
        routes: {
            signup: '/users',
            login: '/users/login',
            update: '/users',
            fetch: '/users'
        }
    }
    
    const middleware = (req, res, next) => {
        log.info('UAMS', req.method, req.url)
        next()
    }
    
    module.exports = opts => {
        
        const options = Object.assign(defaultOptions, opts)
        
        if (!options.app) throw new Error('Restify app instance required')
        if (!options.mongoose) throw new Error('Mongoose instance required')
        log = options.log
        
        log.info('UAMS init')
        
        options.session = {
            User: require('./models/user')(options.mongoose)
        }
        
        const routes = require('./routes')(options)
        
        options.app.uams = {
            options,
            middleware
        }
        
        return options.app.uams
        
    }
    
}())