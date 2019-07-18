module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "moduleNameMapper": { "\\.(css|less)$": "<rootDir>/src/assets/styleMock.js" }
}