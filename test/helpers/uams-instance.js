
const findFunction = function() {
    for (let x in arguments)
        if (typeof arguments[x] === 'function') {
            arguments[x]('test', {})
            break
        }
    return {
        exec: function() {
            return new Promise((resolve, reject) => {
                reject('test error')
            })
        }
    }
}

const uams = require('../../src')({
    log: {
        log: function() {},
        debug: function() {},
        info: function() {},
        warn: function() {},
        error: function() {}
    },
    app: {
        use: function use() {},
        get: function() {},
        put: function() {},
        post: function() {},
        delete: function() {},
    },
    mongoose: {
        Schema: function Schema() {
            return {
                pre: function pre() {},
                statics: {},
                methods: {}
            }
        },
        model: function model(def) {
            return Object.assign(def, {
                find: findFunction,
                findOne: findFunction,
                save: findFunction,
                findOneAndUpdate: findFunction,
                generateHash: function() { return 'fake hash' }
            })
        }
    },
    userField: 'email',
    passField: 'password',
    jwtTokenSecret: 'abc123',
    jwtExpiresIn: '24hr',
    excludeDbFields: [
        '__v',
        'password',
        'lastActiveAt'
    ]
})


module.exports = uams
