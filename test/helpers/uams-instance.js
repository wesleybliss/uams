
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
                methods: {}
            }
        },
        model: function model(def) {
            return Object.assign(def, {
                find: function() {
                    for (let x in arguments)
                        if (typeof arguments[x] === 'function')
                            return arguments[x]('test')
                },
                findOne: function() {
                    for (let x in arguments)
                        if (typeof arguments[x] === 'function')
                            return arguments[x]('test')
                },
                save: function() {
                    for (let x in arguments)
                        if (typeof arguments[x] === 'function')
                            return arguments[x]('test')
                }
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
