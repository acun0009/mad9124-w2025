'use strict';

const http = require('http');
const server = http.createServer(( request, response) => {
    if (request.url === '/feed') {
        response.write('This is your news feed');
    } else if (request.url === '/username') {
        response.write('Atlas');
    } else {
        response.write('Hello World from node.js');
    }
    response.end();
})

server.listen(4000, err => {
    if(err) {
        console.error("something went wrong", err);
        return
    }
    console.log('server running on port 4000');
});