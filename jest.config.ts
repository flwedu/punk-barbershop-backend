/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    clearMocks: true,
    collectCoverage: true,
    coverageProvider: "v8",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
    transform: {
        "^.+\\.(t|j)sx?$": [
            "@swc/jest",
            {
                jsc: {
                    parser: {
                        syntax: "typescript",
                        tsx: false,
                        decorators: true,
                    },
                    target: "es2017",
                    keepClassNames: true,
                    transform: {
                        legacyDecorator: true,
                        decoratorMetadata: true,
                    },
                },
                module: {
                    type: "es6",
                    noInterop: false,
                },
            },
        ],
    },
};
