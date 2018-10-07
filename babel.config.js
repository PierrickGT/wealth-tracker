module.exports = {
    env: {
        production: {
            presets: [
                "@babel/preset-react",
                "@babel/preset-env"
            ],
            plugins: [
                "react-hot-loader/babel",
                "styled-components",
                "transform-class-properties",
                [
                    "import",
                    {
                        "libraryName": "antd",
                        "libraryDirectory": "es",
                        "style": true
                    }
                ]
            ]
        },
        test: {
            presets: [
                "@babel/preset-react",
                "@babel/preset-env"
            ],
            plugins: [
                ["istanbul", {
                  "exclude": [
                    "src/**/*.test.{js,jsx}",
                    "setupJest.js"
                  ]
                }],
                "transform-class-properties"
            ]
        }
    }
}
