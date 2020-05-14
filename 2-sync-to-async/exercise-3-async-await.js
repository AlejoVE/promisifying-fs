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

const readAndAppend = async (file, textToAppend, numberOfTimes) => {
  try {
    log(4, "reading old contents ...");
    const oldContents = await readFilePromise(file, "utf-8");

    for (let i = 1; i <= numberOfTimes; i++) {
      log(4 + i, `appending ...`);
      await appendFilePromise(file, textToAppend);
    }

    log(numberOfTimes + 5, "reading new contents ...");
    const newContents = await readFilePromise(file, "utf-8");

    log(numberOfTimes + 6, "asserting file contents ...");

    const expectedContents = oldContents + textToAppend.repeat(numberOfTimes);
    assert.strictEqual(newContents, expectedContents);
    log(numberOfTimes + 7, "\033[32mpass!\x1b[0m");
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.log(err);
  }
};

readAndAppend(filePath, toAppend, numberOfTimes);
// pass: 5/13/2020, 20:37:47
// pass: 5/13/2020, 20:38:11
// pass: 5/13/2020, 20:38:24
// pass: 5/13/2020, 20:38:41
// pass: 5/13/2020, 20:39:22
// pass: 5/13/2020, 20:40:01
// pass: 5/13/2020, 20:40:20

// pass: 5/13/2020, 20:50:13