const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

const filePath = core.getInput('file-path') || 'app.json';

const pattern = core.getInput('pattern') || '"versionCode": (d+)';
const flags = core.getInput('flags') || 'g';
const regex = new RegExp(pattern, flags);

const main = (filePath, regex) => {
  try {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) core.setFailed(err.message);

      core.info(`Pattern: ${pattern}`);
      core.info(`Flags: ${flags}`);
      core.info(`Regex: ${regex}`);
      core.info(`File data: ${data}`);

      // match regex
      const arr = data.match(regex);
      if (!arr || arr.length < 1) core.setFailed('No matches using regex');

      // get number part
      const numberRegex = /(\d+)/g;
      const numberRxArr = arr[0].match(numberRegex);

      // increment the value
      const incrementedValue = parseInt(numberRxArr[0]) + 1;

      // construct the replacement string
      const replacementString = arr[0].replace(numberRxArr[0], incrementedValue);

      // replace and write
      const result = data.replace(regex, replacementString);
      fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) core.setFailed(err.message);
      });
    });
  } catch (error) {
    core.setFailed(error.message);
  }
};

main(filePath, regex);
