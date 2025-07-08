const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom', // Use jsdom environment for React testing

  // Collect coverage for components and pages, excluding node_modules and build folders
  collectCoverage: true,
  collectCoverageFrom: [
   "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
  coverageDirectory: 'coverage', // Specify directory for coverage reports
  
  // Ignore specific directories and files
  testPathIgnorePatterns: [
    '/node_modules/', // Ignore node_modules
    '/__mocks__/',    // Ignore __mocks__ directory
    '/__tests__/__mocks__/fileMock.js', // Ignore image mocks
    '/__tests__/__mocks__/styleMock.js', // Ignore style mocks
  ],

  // Babel transformation for JS/TS files and handling CSS imports
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx|mjs)$': 'babel-jest', // optional, if needed
  },
  

  // Transform external modules that might not work out of the box
  transformIgnorePatterns: [
    'node_modules/(?!swiper|ssr-window|dom7)/', // Allow these external modules to be transformed
  ],

  // Handle module imports, including CSS modules, images, and Swiper's CSS
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy', // Mock CSS Modules
    '^.+\\.(css|sass|scss)$': '<rootDir>/__tests__/__mocks__/styleMock.js', // Mock other CSS imports
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__tests__/__mocks__/fileMock.js', // Mock image imports

    // Custom mappings for Swiper (the alias for Swiper react and its CSS files)
    '^swiper/react$': '<rootDir>/node_modules/swiper/swiper.js',
  '^swiper/css$': '<rootDir>/__tests__/__mocks__/styleMock.js',
'^swiper/css/.*$': '<rootDir>/__tests__/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/$1', // Alias for @ imports
  },

  // Add the file extensions Jest should consider
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

module.exports = createJestConfig(customJestConfig);
