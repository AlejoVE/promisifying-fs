// require dependencies
const fs = require(`fs`);
const path = require(`path`);
const assert = require(`assert`);
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

const fileName1 = process.argv[2];
const fileToRead = path.join(__dirname, fileName1);
log(1, fileToRead);

const fileName2 = process.argv[3];
const fileToAppend = path.join(__dirname, fileName2);
log(2, fileToAppend);

const readAndAppend = async (toAppend, toRead) => {
  try {
    log(3, `reading original contents from ${fileName2} ...`);
    const oldContents = await readFilePromise(toAppend, "utf-8");
    log(4, `reading from ${fileName1} ...`);
    const contentToAppend = " " + (await readFilePromise(toRead, "utf-8"));
    log(5, `writing to ${fileName2} ...`);
    const newContent = oldContents + contentToAppend;
    await appendFilePromise(toAppend, contentToAppend);
    log(6, `reading from ${fileName2} ...`);
    await readFilePromise(toAppend, "utf-8");
    log(7, `asserting ...`);
    assert.strictEqual(newContent, oldContents + contentToAppend);
    log(8, "\033[32mpass!\x1b[0m");
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.log(err);
  }
};

readAndAppend(fileToAppend, fileToRead);

// pass: 5/13/2020, 13:56:16

// pass: 5/13/2020, 13:56:55

// pass: 5/13/2020, 14:00:41

// pass: 5/13/2020, 14:05:54

// pass: 5/13/2020, 17:20:23