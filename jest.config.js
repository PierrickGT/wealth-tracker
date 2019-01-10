module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.test.{js,jsx}'],
    setupTestFrameworkScriptFile: './setupJest.js',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    'transformIgnorePatterns': [
      '/node_modules/(?!antd)'
    ],
    verbose: true
};
