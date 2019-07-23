'use strict'

const app = require('../src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');

// Crio e set a porta do servidor
const port = normalizedPort(process.env.PORT || '3000');
app.set('port', port);

// Crio o webserver
const server = http.createServer(app);

server.listen(port);
console.log('API rodando na porta ' + port);

function normalizedPort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0){
        return port;
    }
    return false;
}