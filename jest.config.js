module.exports = {
  testRegex: '/__tests__/.*(test|spec)\\.js$',
  globalSetup: '<rootDir>/__tests__/__config__/globalSetup.js',
  globalTeardown: '<rootDir>/__tests__/__config__/globalTeardown.js',
  setupFilesAfterEnv: [
    '<rootDir>/__tests__/__config__/setupTestFrameworkScriptFile.js',
  ],
  collectCoverageFrom: [
    '**/*.js',
    // 'bin/www', // TODO: collecting coverage from an extensionless file is not working https://github.com/facebook/jest/issues/3674
    '!config/**',
    '!coverage/**',
    '!src/migrations/**',
    '!src/models/**',
    '!src/routes/**',
    '!jest.config.js',
  ],
};
