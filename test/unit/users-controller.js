/* global describe it */

const expect = require('chai').expect

describe('Users Controller', () => {
    
    let uams, req, res, next, createToken, token
    let signup, login
    
    before(done => {
        uams = require('../helpers/uams-instance')
        let authUtil = require('../../src/utils/auth')(uams.options)
        createToken = authUtil.createToken
        token = createToken('abc123', true, 0)
        let usersController = require('../../src/controllers/users.controller.js')(uams.options)
        signup = usersController.signup
        login = usersController.login
        done()
    })
    
    beforeEach(done => {
        req = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        done()
    })
    
    it('signup a fake new user', done => {
        // Does not actually save to any DB
        try {
            req.body = {
                username: 'foo',
                password: 'bar'
            }
            res = {
                send: function(code, data) {
                    expect(code).to.equal(200)
                    expect(data.data.user).to.equal(false)
                    done()
                }
            }
            signup(req, res)
        }
        catch (e) {
            done(e)
        }
    })
    
    it('login a fake new user should fail', done => {
        try {
            req.body = {
                username: 'foo',
                password: 'bar'
            }
            res = {
                send: function(code, data) {
                    expect(code).to.equal(500)
                    done()
                }
            }
            login(req, res)
        }
        catch (e) {
            done(e)
        }
    })
    
})