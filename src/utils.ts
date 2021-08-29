const path = require('path');
const { red, yellow } = require('chalk');

const error = console.error;
const log = console.log;
const info = console.info;
const warn = console.warn;

const documentSavePath = (filePath: string, outputFileName: string) => {
  let destinationPath = '';

  if (filePath.includes('\\')) {
    destinationPath = filePath.substr(0, filePath.lastIndexOf('\\'));
  } else if (filePath.includes('/')) {
    destinationPath = filePath.substr(0, filePath.lastIndexOf('/'));
  }

  return path.resolve(destinationPath, outputFileName);
};

const getFileName = (filePath: string) => {
  if (filePath.includes('\\')) {
    return filePath.substr(filePath.lastIndexOf('\\') + 1, filePath.length - 1).split('.')[0];
  } else if (filePath.includes('/')) {
    return filePath.substr(filePath.lastIndexOf('/') + 1, filePath.length - 1).split('.')[0];
  }

  return filePath.split('.')[0];
};

const isJSON = (sourceFileType: string) => sourceFileType === 'json';

const isXLSX = (sourceFileType: string) => sourceFileType === 'xlsx';

const getSourceFileType = (filePath: string) => {
  return (filePath.split('.')[1] || '').toLowerCase();
};

const getFileExtension = (filePath: string) => {
  const sourceFileType = (filePath.split('.')[1] || '').toLowerCase();

  return !isXLSX(sourceFileType) ? '.xlsx' : '.json';
};

const parseErrorMessage = (message: string) => {
  return warn(red(message));
};

const createProcessMessageByType = (filePath: string, sourceFileType: string, isMultipleJSONFilesValid: boolean = false) => {
  return info(
    yellow(
      sourceFileType === 'xlsx'
        ? `\nProcessing! \nConverting XLSX to JSON for the file \n${filePath}\n`
        : `\nProcessing! \nConverting JSON to XLSX for the file${isMultipleJSONFilesValid ? 's' : ''} \n${filePath}\n`,
    ),
  );
};

const addKeyConnectors = (arr: string[]) => {
  return arr.join('.');
};

const writeByCheckingParent = (parentKey: string | null, key: string) => {
  let writeKey = '';

  parentKey !== null ? (writeKey = addKeyConnectors([parentKey, key])) : (writeKey = key);

  return writeKey;
};

const createPathByCheckingSpaceCharacter = (path: string[] | string): string => {
  if (path.length === 1) {
    return path[0];
  } else {
    let concatenatedPath = '';

    for (const [index, pathPieceSeparatedWithSpace] of (path as string[]).entries()) {
      if (index === 0) {
        concatenatedPath += pathPieceSeparatedWithSpace;
      } else {
        concatenatedPath += ` ${pathPieceSeparatedWithSpace}`;
      }
    }

    return concatenatedPath;
  }
};

const checkForMultipleJSONFileErrors = (filePath: string, process: NodeJS.Process) => {
  const multipleJSON = filePath.split(',');

  if (multipleJSON.length > 1) {
    const isMultiplePathCorrect = multipleJSON.every((jsonFilePathName) => jsonFilePathName.includes('.json'));

    if (!isMultiplePathCorrect) {
      const isOneJSONPath = multipleJSON.some((jsonFilePathName) => jsonFilePathName.includes('.json'));

      if (isOneJSONPath) {
        error(red('One of the multiple path entries of the JSON file path is wrong.'));
        process.exit(1);
      } else if (!isOneJSONPath) {
        error(red('Multiple file conversion only works for JSON files.'));
        process.exit(1);
      }
    }
  }
};

const isMultipleJSONFilePathsValid = (filePath: string): boolean => {
  const multipleJSON = filePath.split(',');

  return multipleJSON.length > 1 && multipleJSON.every((jsonFilePathName) => jsonFilePathName.includes('.json'));
};

const getJSONFilePaths = (filePath: string) => {
  return filePath.split(',').map((JSONFilePath) => JSONFilePath.trim());
};

export default {
  log,
  warn,
  info,
  error,
  documentSavePath,
  getFileName,
  getFileExtension,
  isJSON,
  isXLSX,
  getSourceFileType,
  parseErrorMessage,
  createProcessMessageByType,
  addKeyConnectors,
  writeByCheckingParent,
  createPathByCheckingSpaceCharacter,
  isMultipleJSONFilePathsValid,
  checkForMultipleJSONFileErrors,
  getJSONFilePaths,
};
