module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.tsx?$': 'babel-jest' // Añade esta línea si estás usando TypeScript
    },
    testEnvironment: 'jsdom', // Necesario para pruebas de React
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
  };
  