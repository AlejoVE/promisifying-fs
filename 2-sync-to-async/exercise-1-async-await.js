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

const fileName1 = process.argv[2];
const filePath1 = path.join(__dirname, fileName1);
log(1, filePath1);

const fileName2 = process.argv[3];
const filePath2 = path.join(__dirname, fileName2);
log(2, filePath2);

const yourGuess =
  process.argv[4] === "true"
    ? true
    : process.argv[4] === "false"
    ? false
    : undefined;
log(3, yourGuess);

const readAndCompare = async (toRead, toCompare) => {
  try {
    log(4, `reading ${fileName1} ...`);
    const fileContents1 = await readFilePromise(toRead, "utf-8");
    log(5, `reading ${fileName2} ...`);
    const fileContents2 = await readFilePromise(toCompare, "utf-8");

    log(6, "comparing file contents ...");
    const expected = fileContents1 === fileContents2;

    log(7, "asserting your guess ...");
    assert.strictEqual(yourGuess, expected);

    log(8, "\033[32mpass!\x1b[0m");
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.log(err);
  }
};

readAndCompare(filePath1, filePath2);

// pass: 5/13/2020, 19:14:55
// pass: 5/13/2020, 19:15:35

// pass: 5/13/2020, 19:22:33
// pass: 5/13/2020, 19:24:45