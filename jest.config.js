module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/_test/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupTestFrameworkScriptFile: './test/setupScript.ts',
  globalSetup: './test/globalSetup.js',
  globalTeardown: './test/globalTeardown.js',
  verbose: true,
  testEnvironment: 'node'
};
