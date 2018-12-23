import server from './server';

const { PORT } = process.env;

server.start({ port: PORT }, () => console.log('Server is running on port 4000'));

