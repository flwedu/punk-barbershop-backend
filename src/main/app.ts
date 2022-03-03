import { createServer } from 'http';

const server = createServer((request, response) => {
    response.writeHead(200, 'Ok', { contentType: 'text/html' });
    response.write('<p>Sucess! The application is running</p>');
});

server.listen(8080, () => console.log('server running at 8080'));
