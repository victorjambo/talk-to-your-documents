/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testPathIgnorePatterns: ["__tests__/helpers.ts"],
  setupFilesAfterEnv: ['<rootDir>/src/singleton.ts'],
};
