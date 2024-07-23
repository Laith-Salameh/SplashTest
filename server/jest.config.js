module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "rootDir": ".",
    moduleNameMapper: {
      '^@GameEngine/(.*)$': '<rootDir>/src/game-engine/$1',
    },
    // Optionally add other configurations here
  };