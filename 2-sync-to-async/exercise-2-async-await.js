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

const readAndWrite = async (file1, file2) => {
  try {
    log(3, `reading ${fileName1} ...`);
    const fileContents1 = await readFilePromise(file1, "utf-8");

    log(4, `reading ${fileName2} ...`);
    const fileContents2 = await readFilePromise(file2, "utf-8");

    log(5, "comparing file contents ...");

    const fileOneIsLonger = fileContents1.length > fileContents2.length;

    if (fileOneIsLonger) {
      log(6, `writing to ${file2} ...`);
      await writeFilePromise(filePath2, fileContents1);
    } else {
      log(6, `writing to ${file1} ...`);
      await writeFilePromise(filePath1, fileContents2);
    }

    if (fileOneIsLonger) {
      log(7, `reading ${file2} ...`);
      const newFileContents2 = await readFilePromise(filePath2, "utf-8");
      log(8, "asserting ...");
      assert.strictEqual(fileContents1, newFileContents2);
    } else {
      log(7, `reading ${file1} ...`);
      const newFileContents1 = await readFilePromise(filePath1, "utf-8");
      log(8, "asserting ...");
      assert.strictEqual(fileContents2, newFileContents1);
    }

    log(9, "\033[32mpass!\x1b[0m");
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.log(err);
  }
};

readAndWrite(filePath1, filePath2);
// pass: 5/13/2020, 20:16:36
// pass: 5/13/2020, 20:17:01

// pass: 5/13/2020, 20:31:32
// pass: 5/13/2020, 20:31:49
// pass: 5/13/2020, 20:32:27
// pass: 5/13/2020, 20:32:42
// pass: 5/13/2020, 20:32:54