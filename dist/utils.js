"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const { red, yellow } = require('chalk');
const error = console.error;
const log = console.log;
const info = console.info;
const warn = console.warn;
const documentSavePath = (filePath, outputFileName) => {
    let destinationPath = '';
    if (filePath.includes('\\')) {
        destinationPath = filePath.substr(0, filePath.lastIndexOf('\\'));
    }
    else if (filePath.includes('/')) {
        destinationPath = filePath.substr(0, filePath.lastIndexOf('/'));
    }
    return path.resolve(destinationPath, outputFileName);
};
const getFileName = (filePath) => {
    if (filePath.includes('\\')) {
        return filePath.substr(filePath.lastIndexOf('\\') + 1, filePath.length - 1).split('.')[0];
    }
    else if (filePath.includes('/')) {
        return filePath.substr(filePath.lastIndexOf('/') + 1, filePath.length - 1).split('.')[0];
    }
    return filePath.split('.')[0];
};
const isJSON = (sourceFileType) => sourceFileType === 'json';
const isXLSX = (sourceFileType) => sourceFileType === 'xlsx';
const getSourceFileType = (filePath) => {
    return (filePath.split('.')[1] || '').toLowerCase();
};
const getFileExtension = (filePath) => {
    const sourceFileType = (filePath.split('.')[1] || '').toLowerCase();
    return !isXLSX(sourceFileType) ? '.xlsx' : '.json';
};
const stopProcessWithAMessage = (message, process) => {
    warn(red(message));
    process.exit(1);
};
const createProcessMessageByType = (filePath, sourceFileType) => {
    info(yellow(sourceFileType === 'xlsx'
        ? `\nProcessing! \nConverting XLSX to JSON for the file \n${filePath}\n`
        : `\nProcessing! \nconverting JSON to XLSX for the file \n${filePath}\n`));
};
const addKeyConnectors = (arr) => {
    return arr.join('.');
};
const writeByCheckingParent = (parentKey, key) => {
    let writeKey = '';
    parentKey !== null ? (writeKey = addKeyConnectors([parentKey, key])) : (writeKey = key);
    return writeKey;
};
const createPathByCheckingSpaceCharacter = (path) => {
    if (path.length === 1) {
        return path[0];
    }
    else {
        let concatenatedPath = '';
        for (const [index, pathPieceSeparatedWithSpace] of path.entries()) {
            if (index === 0) {
                concatenatedPath += pathPieceSeparatedWithSpace;
            }
            else {
                concatenatedPath += ` ${pathPieceSeparatedWithSpace}`;
            }
        }
        return concatenatedPath;
    }
};
exports.default = {
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
    stopProcessWithAMessage,
    createProcessMessageByType,
    addKeyConnectors,
    writeByCheckingParent,
    createPathByCheckingSpaceCharacter,
};
