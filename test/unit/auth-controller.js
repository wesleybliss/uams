/* global describe it */

const expect = require('chai').expect

describe('Auth Controller', () => {
    
    let uams, authRoute, req, res, next
    
    before(done => {
        uams = require('../helpers/uams-instance')
        let authController = require('../../src/controllers/auth.controller.js')(uams.options)
        authRoute = authController.authRoute
        done()
    })
    
    beforeEach(done => {
        req = {
            headers: {
                authorization: 'Bearer abc123'
            }
        }
        done()
    })
    
    it('authRoute with no auth headers should fail', done => {
        try {
            req.headers = {}
            res = {
                send: function(code, data) {
                    expect(code).to.equal(403)
                    done()
                }
            }
            authRoute(req, res)
        }
        catch (e) {
            done(e)
        }
    })
    
    it('authRoute with bad auth headers should fail', done => {
        try {
            res = {
                send: function(code, data) {
                    expect(code).to.equal(401)
                    expect(data).to.have.own.property('message')
                    done()
                }
            }
            authRoute(req, res)
        }
        catch (e) {
            done(e)
        }
    })
    
    it('authRoute with good auth headers should fail', done => {
        try {
            const { createToken } = require('../../src/utils/auth')(uams.options)
            const token = createToken('abc123', true, 0)
            req.headers.authorization = `Bearer ${token}`
            res = { send: null }
            next = function() {
                expect(req).to.have.own.property('token')
                expect(req).to.have.own.property('decodedToken')
                done()
            }
            authRoute(req, res, next)
        }
        catch (e) {
            done(e)
        }
    })
    
})