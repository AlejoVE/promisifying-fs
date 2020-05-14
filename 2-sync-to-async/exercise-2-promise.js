// require dependencies
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const util = require("util");

// declare constants
const EXERCISE_NAME = path.basename(__filename);
const START = Date.now();

// declare logging function
const log = (logId, value) =>
  console.log(`\nlog ${logId} (${Date.now() - START} ms):\n`, value);

// --- main script ---
console.log(`\n--- ${EXERCISE_NAME} ---`);

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const fileName1 = process.argv[2];
const filePath1 = path.join(__dirname, fileName1);
log(1, filePath1);

const fileName2 = process.argv[3];
const filePath2 = path.join(__dirname, fileName2);
log(2, filePath2);

log(3, `reading ${fileName1} ...`);
readFilePromise(filePath1, "utf-8").then((fileContent1) => {
  const fileContents1 = fileContent1;
  log(4, `reading ${fileName2} ...`);
  readFilePromise(filePath2, "utf-8").then((fileContent2) => {
    const fileContents2 = fileContent2;
    log(5, "comparing file contents ...");
    const fileOneIsLonger = fileContents1.length > fileContents2.length;

    if (fileOneIsLonger) {
      log(6, `writing to ${fileName2} ...`);
      writeFilePromise(filePath2, fileContents1);
    } else {
      log(6, `writing to ${fileName1} ...`);
      writeFilePromise(filePath1, fileContents2);
    }

    if (fileOneIsLonger) {
      log(7, `reading ${fileName2} ...`);
      readFilePromise(filePath2, "utf-8").then((newFileContent2) => {
        const newFileContents2 = newFileContent2;
        log(8, "asserting ...");
        assert.strictEqual(fileContents1, newFileContents2);
        log(9, "\033[32mpass!\x1b[0m");
        fs.appendFileSync(
          __filename,
          `\n// pass: ${new Date().toLocaleString()}`
        );
      });
    } else {
      log(7, `reading ${fileName1} ...`);
      readFilePromise(filePath1, "utf-8").then((newFileContent1) => {
        const newFileContents1 = newFileContent1;
        log(8, "asserting ...");
        assert.strictEqual(fileContents2, newFileContents1);
        log(9, "\033[32mpass!\x1b[0m");
        fs.appendFileSync(
          __filename,
          `\n// pass: ${new Date().toLocaleString()}`
        );
      });
    }
  });
});

// pass: 5/13/2020, 22:18:19
// pass: 5/13/2020, 22:19:45
// pass: 5/13/2020, 22:19:54

// pass: 5/13/2020, 22:38:46

// pass: 5/13/2020, 22:40:08
// pass: 5/13/2020, 22:40:18