const config = {
  preset: 'ts-jest',
  testEnvironment: 'enzyme',
  setupFilesAfterEnv: ['jest-enzyme'],
  reporters: [
    'default',
    ['jest-junit', { suiteName: 'react-toyer-unit', outputDirectory: './reports', outputName: 'react-toyer.xml' }],
  ],
  testPathIgnorePatterns: ['node_modules', 'dist'],
};

export default config;
