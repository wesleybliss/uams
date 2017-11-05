/* global describe it */

const expect = require('chai').expect

describe('Initialize & create middleware', () => {
    it('should initialize middleware', done => {
        try {
            const uams = require('../../src')({
                log: console,
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
                    model: function model() {}
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
            expect(uams).to.have.property('options')
            expect(uams).to.have.property('middleware')
            done()
        }
        catch (e) {
            done(e)
        }
    })
})