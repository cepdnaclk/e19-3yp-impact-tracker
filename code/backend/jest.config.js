/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 10000, // or any other value in milliseconds
  maxWorkers: 4,

  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "json", "ts", "jsx", "node", "tsx"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tt]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
