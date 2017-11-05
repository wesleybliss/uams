/* global describe it */

const expect = require('chai').expect

describe('Initialize & create middleware', () => {
    it('should initialize middleware', done => {
        try {
            const uams = require('../helpers/uams-instance')
            expect(uams).to.have.property('options')
            expect(uams).to.have.property('middleware')
            done()
        }
        catch (e) {
            done(e)
        }
    })
})