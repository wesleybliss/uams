/* global describe it */

const expect = require('chai').expect
const jwt = require('jsonwebtoken')

describe('Utils', () => {
    
    let uams, createToken, sanitizeModel, jwtTokenSecret, dirtyModel
    
    before(done => {
        uams = require('../helpers/uams-instance')
        jwtTokenSecret = uams.options.jwtTokenSecret
        authUtil = require('../../src/utils/auth')(uams.options)
        createToken = authUtil.createToken
        sanitizeModel = authUtil.sanitizeModel
        done()
    })
    
    beforeEach(done => {
        dirtyModel = {
            'foo': 'bar',
            '__v': '1234',
            'password': 'abc123',
            'lastActiveAt': Date()
        }
        done()
    })
    
    it('should create a JWT token that passes verification', done => {
        try {
            const token = createToken('abc123', true, 0)
            jwt.verify(token, jwtTokenSecret, (err, decoded) => {
                if (err) done(err)
                else done()
            })
        }
        catch (e) {
            done(e)
        }
    })
    
    it('should sanitize a model (object) by removing restricted fields', done => {
        try {
            const cleanModel = sanitizeModel(dirtyModel)
            expect(cleanModel).to.have.property('foo')
            expect(cleanModel.foo).to.equal('bar')
            expect(cleanModel).to.not.have.property('__v')
            expect(cleanModel).to.not.have.property('password')
            expect(cleanModel).to.not.have.property('lastActiveAt')
            done()
        }
        catch (e) {
            done(e)
        }
    })
    
    it('should sanitize a model, but keep specified fields', done => {
        try {
            const cleanModel = sanitizeModel(dirtyModel, ['password'])
            expect(cleanModel).to.have.property('foo')
            expect(cleanModel.foo).to.equal('bar')
            expect(cleanModel).to.not.have.property('__v')
            expect(cleanModel).to.not.have.property('lastActiveAt')
            expect(cleanModel).to.have.property('password')
            expect(cleanModel.password).to.equal('abc123')
            done()
        }
        catch (e) {
            done(e)
        }
    })
    
    it('should sanitize a model, but ignore invalid non-array \'keepFields\'', done => {
        try {
            const cleanModel = sanitizeModel(dirtyModel, 'password')
            expect(cleanModel).to.have.property('foo')
            expect(cleanModel.foo).to.equal('bar')
            expect(cleanModel).to.not.have.property('__v')
            expect(cleanModel).to.not.have.property('password')
            expect(cleanModel).to.not.have.property('lastActiveAt')
            done()
        }
        catch (e) {
            done(e)
        }
    })
    
})