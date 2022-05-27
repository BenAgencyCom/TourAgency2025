import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const customConfig = createJestConfig({
    roots: ["./tests"],
    transform: { "^.+\\.tsx?$": "ts-jest" },
    moduleNameMapper: {
        "^@/utils/(.*)$": "<rootDir>/utils/$1",
        "^@/@types/(.*)$": "<rootDir>/@types/$1",
        "^@/tests/(.*)$": "<rootDir>/tests/$1",
    },
});

export default customConfig();
