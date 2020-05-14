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
const appendFilePromise = util.promisify(fs.appendFile);

const filePath = path.join(__dirname, process.argv[2]);
log(1, filePath);

const toAppend = process.argv[3];
log(2, toAppend);

const numberOfTimes = Number(process.argv[4]);
log(3, numberOfTimes);

log(4, "reading old contents ...");
readFilePromise(filePath, "utf-8")
  .then((fileContent) => {
    const oldContents = fileContent;
    for (let i = 1; i <= numberOfTimes; i++) {
      log(4 + i, `appending ...`);
      appendFilePromise(filePath, toAppend);
    }
    log(numberOfTimes + 5, "reading new contents ...");
    readFilePromise(filePath, "utf-8").then((newContent) => {
      const newContents = newContent;
      log(numberOfTimes + 6, "asserting file contents ...");

      const expectedContents = oldContents + toAppend.repeat(numberOfTimes);
      assert.strictEqual(newContents, expectedContents);
      log(numberOfTimes + 7, "\033[32mpass!\x1b[0m");
      fs.appendFileSync(
        __filename,
        `\n// pass: ${new Date().toLocaleString()}`
      );
    });
  })
  .catch((err) => console.log(err));

// pass: 5/13/2020, 22:45:39

// pass: 5/13/2020, 22:59:55
// pass: 5/13/2020, 22:59:55

// pass: 5/13/2020, 23:01:25
// pass: 5/13/2020, 23:01:25

// pass: 5/13/2020, 23:10:07
// pass: 5/13/2020, 23:10:25
// pass: 5/13/2020, 23:11:17
// pass: 5/13/2020, 23:11:33
