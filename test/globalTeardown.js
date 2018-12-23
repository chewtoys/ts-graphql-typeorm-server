require('ts-node/register');

module.exports = async () => {
  await global.server.close();
};