const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

const filePath = core.getInput('file-path') || 'app.json';
const regex = core.getInput('regex') || /"versionCode": (\d+),/g;

const main = (filePath, regex) => {
  try {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;

      // match regex
      const arr = data.match(regex);
      if (!arr || arr.length < 1) throw Error('No matches');

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
        if (err) throw err;
      });
    });

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main(filePath, regex);
