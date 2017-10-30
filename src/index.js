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
        const models = {
            User: require('./models/user')(o.mongoose)
        }
        
        // Controllers
        const controllers = {
            Read: require('./controllers/read')(models.User),
            Write: require('./controllers/write')(models.User),
            State: require('./controllers/state')(models.User)
        }
        
        // Routes
        const routes = {
            Read: require('./routes/read')(log, o.app, controllers.Read),
            Write: require('./routes/write')(log, o.app, controllers.Write),
            State: require('./routes/state')(log, o.app, controllers.State)
        }
        
        return {
            models,
            controllers,
            routes,
            middleware
        }
        
    }
    
}());