import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: { '\\.(css|less|scss|sass)$': 'identity-obj-proxy' },
  preset: 'ts-jest',
  rootDir: __dirname,
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts',
    '<rootDir>/jest.setup.ts',
  ],
  testEnvironment: 'jest-fixed-jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: { '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest' },
  collectCoverage: true,
  coverageReporters: ['html'],
};

export default config;
