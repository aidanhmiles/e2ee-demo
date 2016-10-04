# What is this?

A very basic foray into end-to-end encryption in Node, over Websockets.

### Features:
 - basic signup / login (no validations of any kind)
 - a list of other users who are online; click a user's name to send them an encrypted message (typing your own message coming soon)

# How does the encryption work?

At a high-level:
 - Client logs in with password 
 - Server returns bearer token, to allow client to use the app 
 - Client generates a keypair locally, and publish the public key when connecting to the chat application
 - Two clients communicate by creating a shared secret via their respective keys, then use that secret to communicate via a symmetric cipher.
 - Everything would be over TLS if this were a real deployment

Both public-key and symmetric encryption are provided by [JS NaCl](https://github.com/tonyg/js-nacl), and password hashing is handled by [BcryptJS](https://github.com/dcodeIO/bcrypt.js).

I wanted to use Scrypt, but had issues compiling code from either the [Node](https://github.com/barrysteyn/node-scrypt) or [browser](https://github.com/tonyg/js-scrypt) ports of it. Someday I'll replace Bcrypt with Scrypt, or something better.

# Dev setup

### Requirements:
 - Docker Compose (I use it with Docker for Mac without issue)
 - Node/NPM

### Setup steps:
 - `npm install`
 - `docker-compose build`
 - `docker-compose up`
 - `./gulp` (the `./` is required because the project uses Gulp 4, and most people have Gulp 3 installed globally, so I made a script to delegate to the locally installed Gulp 4)

Docker runs 3 containers: MySQL (on 3306), Nginx (on 80), and Node (on 8080).

Gulp runs `webpack-dev-server` on port 8083.

If you run `./gulp build`, you'll be able to load the app at `localhost` (no port) via Nginx, or at `localhost:8080` directly via Node.

About the code:

 - No Bower. Frontend package dependencies are only used in development, since bundled files are generated and not ever deployed or installed in a deployed server. Thus frontend dependencies are installed as dev depdendencies.
 - Approximately 0 effort was expended in making the UI, but it should still be navigable. 

