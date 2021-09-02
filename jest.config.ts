import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  reporters: [
    'default',
    ['jest-junit', { suiteName: 'react-toyer-unit', outputDirectory: './reports', outputName: 'react-toyer.xml' }],
  ],
  testPathIgnorePatterns: ['node_modules', 'dist'],
};

export default config;
