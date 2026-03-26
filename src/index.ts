import { createServer } from 'node:http';
import debug from 'debug';
import { app } from './app.ts';
import { env } from './env.ts';

const log = debug('express-server:index');
const port = env.PORT || 3040;

const server = createServer(app);
log('Server created');

// server.listen(port, () => {
//     log(`Server listening on port ${port}`);
// });

const listenManager = () => {
    const addr = server.address();
    if (addr === null) return;
    let bind;
    if (typeof addr === 'string') {
        bind = 'pipe ' + addr;
    } else {
        bind =
            addr.address === '::'
                ? `http://localhost:${addr?.port}`
                : `${addr.address}:${addr?.port}`;
    }
    if (env.NODE_ENV !== 'dev') {
        console.log(`Server listening on ${bind}`);
    } else {
        log(`Servidor escuchando en ${bind}`);
    }
};

server.listen(port, listenManager);
