const os = require('os');

module.exports = {
  cacheDirectory: '.cache/jest',
  clearMocks: true,
  moduleNameMapper: {
    // non-js files
    '\\.(jpg|jpeg|png|apng|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss|stylesheet)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(md)$': '<rootDir>/__mocks__/htmlMock.js',

    // core-js v2 to v3 mapping
    'core-js/modules/es6.(.*)': 'core-js/modules/es.$1',
    'core-js/modules/es7.(.*)': 'core-js/modules/esnext.$1',
    'core-js/library/fn/(.*)': `core-js/features/$1`,
    'core-js/es5/(.*)': `core-js/es/$1`,
    'core-js/es6/(.*)': `core-js/es/$1`,
    'core-js/es7/reflect': `core-js/proposals/reflect-metadata`,
    'core-js/es7/(.*)': `core-js/proposals/$1`,
    'core-js/object$/': `core-js/es/object`,
    'core-js/object/(.*)': `core-js/es/object/$1`,
    'babel-runtime/core-js/(.*)': `core-js/es/$1`,
    // 'babel-runtime/core-js/object/assign'
    'core-js/library/fn/object/assign': 'core-js/es/object/assign',
  },
  projects: [
    '<rootDir>',
    // '<rootDir>/app/angular',
    // '<rootDir>/examples/svelte-kitchen-sink',
    // '<rootDir>/examples/vue-kitchen-sink',
    // '<rootDir>/examples/angular-cli',
    // '<rootDir>/examples/preact-kitchen-sink',
    // This is explicitly commented out because having vue 2 & 3 in the
    // dependency graph makes it impossible to run storyshots on both examples
    // '<rootDir>/examples/vue-3-cli',
  ],
  roots: ['<rootDir>/addons', '<rootDir>/frameworks', '<rootDir>/lib', '<rootDir>/renderers'],
  transform: {
    '^.+\\.stories\\.[jt]sx?$': '@storybook/addon-storyshots/injectFileName',
    '^.+\\.[jt]sx?$': '<rootDir>/../scripts/utils/jest-transform-js.js',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  },
  transformIgnorePatterns: ['/node_modules/(?!lit-html).+\\.js'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: [
    '/storybook-static/',
    '/node_modules/',
    '/dist/',
    '/prebuilt/',
    'addon-jest.test.js',
    '/frameworks/angular/*',
    '/examples/*/src/*.*',
    '/examples/*/src/*/*.*',
    '/examples/*/src/*/*/*.*',
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    'frameworks/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'addons/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/cli/test/',
    '/dist/',
    '/prebuilt/',
    '/generators/',
    '/dll/',
    '/__mocks__ /',
    '/__mockdata__/',
    '/__mocks-ng-workspace__/',
    '/__testfixtures__/',
    '^.*\\.stories\\.[jt]sx?$',
    'typings.d.ts$',
  ],
  globals: {
    PREVIEW_URL: undefined,
    SNAPSHOT_OS: os.platform() === 'win32' ? 'windows' : 'posix',
  },
  snapshotSerializers: [
    '@emotion/jest/serializer',
    'enzyme-to-json/serializer',
    'jest-serializer-html',
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./jest.init.ts'],
  coverageReporters: ['lcov'],
  testEnvironment: 'jest-environment-jsdom-thirteen',
  setupFiles: ['raf/polyfill'],
  testURL: 'http://localhost',
  modulePathIgnorePatterns: ['/dist/.*/__mocks__/', '/storybook-static/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  reporters: ['default', 'jest-junit'],
};
