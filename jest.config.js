module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.test.{js,jsx}'],
    coverageDirectory: './coverage/',
    setupTestFrameworkScriptFile: './setupJest.js',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    verbose: true
};
