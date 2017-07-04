
const checkOptions = o => {
    
    if (!o.uri || o.uri.length < 1)
        throw new Error('URI required')
    
    if (!o.uri.includes('://'))
        throw new Error('Malformed URI ' + o.uri)
    
    const dataSource = o.uri.substring(0, o.uri.indexOf('://'))
    
    switch (dataSource) {
        
        case 'mongodb':
            console.info('MongoDB data source detected')
            break
        
        default:
            throw new Error('Unsuported datasource ' + dataSource)
        
    }
    
}

const seed = () => {
    
}

const authenticate = (email, password) => {
    
}

const middleware = (req, res, next) => {
    
    console.info(req.method, req.url)
    
    next()
    
}



const defaultOptions = {
    uri: null
}

module.exports = opts => {
    
    const o = Object.assign(defaultOptions, opts)
    
    checkOptions(o)
    
    return middleware
    
}
