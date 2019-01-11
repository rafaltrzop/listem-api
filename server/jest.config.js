module.exports = {
  collectCoverageFrom: [
    '**/*.{js}',
    // 'bin/www', // TODO: collecting coverage from an extensionless file is not working https://github.com/facebook/jest/issues/3674
    '!config/**',
    '!coverage/**',
    '!migrations/**',
    '!models/**',
    '!routes/**',
    '!jest.config.js',
  ],
};
