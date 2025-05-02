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
  transform: {
    // Use an array to pass options to ts-jest:
    // '^.+\\.[tj]sx?$' to process js/ts/jsx/tsx files with ts-jest
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.spec.json', // Point to your test-specific tsconfig
      },
    ],
  },
  // By default, node_modules are ignored by transforms. Explicitly tell Jest NOT to ignore keycloak-js.
  transformIgnorePatterns: ['/node_modules/(?!keycloak-js)/'],
  collectCoverage: true,
  coverageReporters: ['html'],
};

export default config;
