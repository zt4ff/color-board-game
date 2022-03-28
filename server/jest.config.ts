import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverage: true,
  coverageReporters: ["text-summary", "html"],
  collectCoverageFrom: [
    "**.ts",
    "!**/*.config.{js,ts}",
    "!index.ts",
    "!**/@types/**",
  ],
};
export default config;
