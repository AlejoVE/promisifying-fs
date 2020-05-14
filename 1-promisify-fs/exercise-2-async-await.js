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
const copyFilePromise = util.promisify(fs.copyFile);

const fileName1 = process.argv[2];
const sourcePath = path.join(__dirname, fileName1);
log(1, sourcePath);

const fileName2 = process.argv[3];
const targetPath = path.join(__dirname, fileName2);
log(2, targetPath);

const readAndCopy = async (source, target) => {
  try {
    log(3, `reading original contents from ${fileName1} ...`);
    const sourceContent = await readFilePromise(source, "utf-8");
    log(4, `copying to ${fileName2} ...`);
    await copyFilePromise(source, target);

    log(5, `reading ${fileName1} ...`);
    const originalSourceContent = sourceContent;

    log(6, `asserting ${fileName1} ...`);
    assert.strictEqual(sourceContent, originalSourceContent);

    log(7, `reading ${fileName2} ...`);
    const targetContent = await readFilePromise(target, "utf-8");

    log(8, `asserting ${fileName2} ...`);
    assert.strictEqual(targetContent, originalSourceContent);

    log(9, "\033[32mpass!\x1b[0m");

    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.log(err);
  }
};

readAndCopy(sourcePath, targetPath);

// pass: 5/12/2020, 22:53:50

// pass: 5/12/2020, 23:05:37
// pass: 5/12/2020, 23:06:30

// pass: 5/12/2020, 23:14:13

// pass: 5/12/2020, 23:15:18

// pass: 5/13/2020, 17:23:31