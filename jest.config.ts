import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const customConfig = createJestConfig({
    roots: ["./tests"],
    testEnvironment: "jest-environment-jsdom",
    transform: { "^.+\\.tsx?$": "ts-jest" },
    moduleNameMapper: {
        "^@/utils/(.*)$": "<rootDir>/utils/$1",
        "^@/@types/(.*)$": "<rootDir>/types/$1",
    },
});

export default customConfig();
