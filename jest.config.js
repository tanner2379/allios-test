module.exports = {
  displayName: 'names-api-core',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', '.'],
  coverageDirectory: '/../coverage/libs/names/api/',
};
