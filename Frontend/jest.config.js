module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!**/*index.js",
    "!src/serviceWorker.js",
    "!src/polyfill.js",
  ],
  coverageDirectory: "coverage",
};
