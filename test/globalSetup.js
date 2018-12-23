require('ts-node/register');

const server = require('../src/server.ts').default;

module.exports = async () => {
  global.server = await server.start(() => console.log('Test server is running!'));
};