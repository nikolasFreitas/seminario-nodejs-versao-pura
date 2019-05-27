const http = require('http');
const user = require('./JSON/user.json');
const getIp = require('./helpers/getIp');
const processPost = require('./helpers/processPost');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/usuario':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
            break;

        case '/':
            res.statusCode = 204;
            res.end();
            break;

        case '/message':
            if (req.method === 'POST') {
                console.log(`\n\n Nova mensagem:`);
                processPost(req, res, () => {
                    const post = JSON.parse(req.post);
                    try {
                        const message = post.message;

                        if (message) {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain')
                            res.end("Recebido ;D");
                            console.log(message);
                        } else {
                            res.statusCode = 400;
                            res.setHeader('Content-Type', 'text/html')
                            res.end("<h1>Verifique no seu body o seu JSON</h1>");
                        }
                    } catch (error) {
                        res.statusCode = 400;
                        res.setHeader('Content-Type', 'text/plain')
                        res.end("Houve algum erro na sua requisição");
                        throw error;
                    }
                });

            } else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/html');
                res.end("<h1>Somente utilizando post</h1>");
            }
            break;

        default:
            res.statusCode = 404;
            res.end("Not found");
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Servidor está rodando na http://${hostname}:${port}/`);
    console.log("================ \n");

    console.log("Hora do feedback:");
    getIp();
    console.log("No corpo da mensagem coloque um JSON com {'message': 'Eu queria dizer...'}");

    console.log("\n================");

});


