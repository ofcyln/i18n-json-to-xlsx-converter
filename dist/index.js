#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
const chalk = require('chalk');
const readXLSXFile = require('read-excel-file/node');
const Excel = require('exceljs');
const unflatten = require('flat').unflatten;
const utils_1 = require("./utils");
(async () => {
    try {
        const path = process.argv.slice(3);
        const filePath = utils_1.default.createPathByCheckingSpaceCharacter(path);
        if (!filePath || typeof filePath === 'boolean') {
            utils_1.default.parseErrorMessage('No file path to convert is given. Specify the file path after the --convert parameter.');
            process.exit(1);
        }
        const sourceFileType = utils_1.default.getSourceFileType(filePath);
        const isMultipleJSONFilePaths = utils_1.default.getJSONFilePaths(filePath).length > 1;
        const isMultipleJSONFilePathsValid = utils_1.default.isMultipleJSONFilePathsValid(filePath);
        if (utils_1.default.isJSON(sourceFileType) || utils_1.default.isXLSX(sourceFileType) || isMultipleJSONFilePathsValid) {
            utils_1.default.createProcessMessageByType(filePath, sourceFileType, (isMultipleJSONFilePathsValid && isMultipleJSONFilePaths));
        }
        else {
            utils_1.default.checkForMultipleJSONFileErrors(filePath, process);
            utils_1.default.parseErrorMessage('File type is not supported. Either use JSON or XLSX file to convert.');
            process.exit(1);
        }
        if (utils_1.default.isXLSX(sourceFileType)) {
            const readXlsx = () => {
                return readXLSXFile(filePath).then((rows) => {
                    const titleRow = rows[0];
                    const allLanguages = {};
                    const titles = [];
                    for (const [idx, row] of titleRow.entries()) {
                        titles.push(row);
                        if (idx > 0) {
                            allLanguages[row] = {};
                        }
                    }
                    for (let idx = 1; idx < rows.length; idx++) {
                        const row = rows[idx];
                        for (let secondIdx = 1; secondIdx < row.length; secondIdx++) {
                            if (row[0]) {
                                allLanguages[titles[secondIdx]][row[0]] = row[secondIdx];
                            }
                        }
                    }
                    return allLanguages;
                });
            };
            readXlsx()
                .then((allLanguages) => {
                let outputFileName = '';
                for (const languageTitle in allLanguages) {
                    outputFileName = `${languageTitle.trim().toLowerCase()}${utils_1.default.getFileExtension(filePath)}`;
                    const unflattenedLanguageObj = unflatten(allLanguages[languageTitle], { object: true });
                    fs.writeFileSync(utils_1.default.documentSavePath(filePath, outputFileName), JSON.stringify(unflattenedLanguageObj, null, 2), 'utf-8');
                    utils_1.default.log(chalk.yellow(`Output file name for ${languageTitle} is ${outputFileName}`));
                    utils_1.default.log(chalk.grey(`Location of the created file is`));
                    utils_1.default.log(chalk.magentaBright(`${utils_1.default.documentSavePath(filePath, outputFileName)}\n`));
                }
                utils_1.default.log(chalk.green(`File conversion is successful!`));
            })
                .catch((e) => {
                utils_1.default.error(chalk.red(`Error: ${e}`));
                process.exit(1);
            });
        }
        else {
            const JSONFiles = utils_1.default.getJSONFilePaths(filePath);
            for (const JSONFile of JSONFiles) {
                const sourceBuffer = await fs.promises.readFile(JSONFile);
                const sourceText = sourceBuffer.toString();
                const sourceData = JSON.parse(sourceText);
                const workbook = new Excel.Workbook();
                const worksheet = workbook.addWorksheet('Converted');
                let rowCount = 1;
                const writeToXLSX = (key, value) => {
                    const rows = worksheet.getRow(rowCount);
                    rows.getCell(1).value = key;
                    // Check for null, "" of the values and assign semantic character for that
                    rows.getCell(2).value = (value || '-').toString();
                    rowCount += 1;
                };
                writeToXLSX('Key', utils_1.default.getFileName(JSONFile).toUpperCase());
                const parseAndWrite = (parentKey, targetObject) => {
                    const keys = Object.keys(targetObject);
                    for (const key of keys) {
                        const element = targetObject[key];
                        if (typeof element === 'object' && element !== null) {
                            parseAndWrite(utils_1.default.writeByCheckingParent(parentKey, key), element);
                        }
                        else {
                            writeToXLSX(utils_1.default.writeByCheckingParent(parentKey, key), element);
                        }
                    }
                };
                parseAndWrite(null, sourceData);
                worksheet.getColumn(1).width = 50;
                worksheet.getColumn(2).width = 50;
                await workbook.xlsx
                    .writeFile(utils_1.default.documentSavePath(JSONFile, `${utils_1.default.getFileName(JSONFile)}.xlsx`))
                    .then(() => {
                    utils_1.default.log(chalk.yellow(`Output file name is ${utils_1.default.getFileName(JSONFile)}${utils_1.default.getFileExtension(JSONFile)}`));
                    utils_1.default.log(chalk.grey(`Location of the created file is`));
                    utils_1.default.log(chalk.magentaBright(`${utils_1.default.documentSavePath(JSONFile, `${utils_1.default.getFileName(JSONFile)}${utils_1.default.getFileExtension(JSONFile)}`)}\n`));
                    utils_1.default.log(chalk.green(`File conversion is successful!\n`));
                })
                    .catch((e) => {
                    utils_1.default.error(chalk.red(`Error: ${e}`));
                    process.exit(1);
                });
            }
        }
    }
    catch (e) {
        utils_1.default.error(chalk.red(`Error: ${e}`));
        process.exit(1);
    }
})();
