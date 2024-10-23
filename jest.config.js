/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  setupFiles: [
    "./dotenv-config.js"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
    "coveragePathIgnorePatterns": [
      "/node_modules/"
    ]
};