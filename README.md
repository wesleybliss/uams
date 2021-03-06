# UAMS

[![Build Status](https://travis-ci.org/wesleybliss/uams.svg?branch=master)](https://travis-ci.org/wesleybliss/uams)

> User Access Management System

User account management middleware for Restify.

See [Restify Starter](https://github.com/wesleybliss/restify-starter) for example usage.


## Features

- Plugs into existing Restify servers
- Configurable options for route endpoints, JWT tokens, etc.
- Extensible Mongoose models


## Roadmap

- Forgotten password recovery


## Motivation

Although a decent number of Node frameworks can manage users,
most fall short on integration. [Aqua](https://jedireza.github.io/aqua/)
(previously Drywall) came the closest, though it provides no way
to extend the user model to include your own fields.

UAMS aims to simply and extensibly:
- Provide all of the basic features for user management
- Be quick & easy for rapid MVP development
- Allow more control over routes and models
- Be minimally invasive to your existing code
- Work almost completely out of the box with almost no configuration


## Installation

```bash
$ npm i
```


## Setup / Configuration

A basic example Restify server using UAMS:

```javascript
// app.js
'use strict'
const restify = require('restify')

const app = restify.createServer({
    name:    'UAMS/Restify Example',
    version: '1.0.0'
})

app.use(restify.plugins.acceptParser(app.acceptable))
app.use(restify.plugins.fullResponse())
app.use(restify.plugins.queryParser())
app.use(restify.plugins.bodyParser({ extended: true }))
app.use(restify.plugins.gzipResponse())
app.use(restify.plugins.authorizationParser())

const uams = require('../../uams')({
    app,                            // Restify server instance
    log: console,                   // Any compatible logger (see readme)
    mongoose: require('mongoose'),  // Mongoose instance
    userField: 'email',             // User field (typically "email" or "username")
    passField: 'password',          // Password field
    jwtTokenSecret: 'abc123',       // JWT token secret
    jwtExpiresIn: '24hr',           // JWT token expiration
    excludeDbFields: [              // Fields to be excluded from responses
        '__v',
        'password',
        'lastActiveAt'
    ]
})

app.use(uams.middleware)

module.exports = app
```

```javascript
// index.js
'use strict'

const app = require('./app')

require('require-all')(path.resolve(__dirname, 'routes'))

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

app.listen( port, host, console.info(
    `App listening at http://${host}:${port}` ) )
```


## Options

| Option          | Default Value    | Required | Description |
| --------------- | ---------------- | -------- | ----------- |
| app             | `null`           | Yes      | Restify server instance
| mongoose        | `null`           | Yes      | Mongoose instance
| log             | `console`        | No       | Any compatible logger (see readme)
| userField       | `username`       | No       | User field (typically "email" or "username")
| passField       | `password`       | No       | Password field
| jwtTokenSecret  | `null`           | No       | JWT token secret
| jwtExpiresIn    | `null`           | No       | JWT token expiration
| excludeDbFields | `['']`           | No       | Fields to be excluded from responses
| routes          | `-`              | No       | -
| routes.signup   | `/users`         | No       | `POST` signup route
| routes.login    | `/users/login`   | No       | `POST` login route
| routes.update   | `/users`         | No       | `PUT` update route
| routes.fetch    | `/users`         | No       | `GET` fetch route
| userSchema      | `{}`             | No       | Additional fields to add to the user model *(see [Mongoose Schema](http://mongoosejs.com/docs/guide.html))*


---


## Donate

Buy me a scotch to say thanks & fund future development!

Bitcoin: `1MxHTKiBPTusqNaBrxcbkDyYL68tvndZ3N`

Ethereum: `0x68Df32F670E025cf3870d9021Ec6B5b4af1425DC`
