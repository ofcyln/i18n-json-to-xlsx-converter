#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');
const readXLSXFile = require('read-excel-file/node');
const Excel = require('exceljs');
const unflatten = require('flat').unflatten;
import utils from './utils';

(async () => {
  try {
    const path = process.argv.slice(3);
    const filePath = utils.createPathByCheckingSpaceCharacter(path);

    if (!filePath || typeof filePath === 'boolean') {
      utils.stopProcessWithAMessage('No file path to convert is given. Specify the file path after the --convert parameter.', process);
    }

    const sourceFileType = utils.getSourceFileType(filePath);

    if (utils.isJSON(sourceFileType) || utils.isXLSX(sourceFileType)) {
      utils.createProcessMessageByType(filePath, sourceFileType);
    } else {
      utils.stopProcessWithAMessage('File type is not supported. Either use JSON or XLSX file to convert.', process);
    }

    if (utils.isXLSX(sourceFileType)) {
      const readXls = () => {
        return readXLSXFile(filePath).then((rows: string[][]) => {
          const titleRow = rows[0];
          const allLanguages: any = {};
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

      readXls()
        .then((allLanguages: any) => {
          let outputFileName = '';

          for (const languageTitle in allLanguages) {
            outputFileName = `${languageTitle.trim().toLowerCase()}${utils.getFileExtension(filePath)}`;

            const unflattenedLanguageObj = unflatten(allLanguages[languageTitle], { object: true });

            fs.writeFileSync(utils.documentSavePath(filePath, outputFileName), JSON.stringify(unflattenedLanguageObj, null, 2), 'utf-8');

            utils.log(chalk.yellow(`Output file name for ${languageTitle} is ${outputFileName}`));
            utils.log(chalk.grey(`Location of the created file is`));
            utils.log(chalk.magentaBright(`${utils.documentSavePath(filePath, outputFileName)}\n`));
          }

          utils.log(chalk.green(`File conversion is successful!`));
        })
        .catch((e: Error) => {
          utils.error(chalk.red(`Error: ${e}`));

          process.exit(1);
        });
    } else {
      const sourceBuffer = await fs.promises.readFile(filePath);
      const sourceText = sourceBuffer.toString();
      const sourceData = JSON.parse(sourceText);
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Converted');
      let rowCount = 1;

      const write = (key: string, value: string) => {
        const rows = worksheet.getRow(rowCount);

        rows.getCell(1).value = key;

        // Check for null, "" of the values and assign semantic character for that
        rows.getCell(2).value = (value || '-').toString();

        rowCount += 1;
      };

      write('Key', utils.getFileName(filePath).toUpperCase());

      const parseAndWrite = (parentKey: string | null, targetObject: any) => {
        const keys = Object.keys(targetObject);

        for (const key of keys as string[]) {
          const element: any = targetObject[key];

          if (typeof element === 'object' && element !== null) {
            parseAndWrite(utils.writeByCheckingParent(parentKey, key), element);
          } else {
            write(utils.writeByCheckingParent(parentKey, key), element);
          }
        }
      };

      parseAndWrite(null, sourceData);

      worksheet.getColumn(1).width = 50;
      worksheet.getColumn(2).width = 50;

      await workbook.xlsx
        .writeFile(utils.documentSavePath(filePath, `${utils.getFileName(filePath)}.xlsx`))
        .then(() => {
          utils.log(chalk.yellow(`Output file name is ${utils.getFileName(filePath)}${utils.getFileExtension(filePath)}`));
          utils.log(chalk.grey(`Location of the created file is`));
          utils.log(
            chalk.magentaBright(
              `${utils.documentSavePath(filePath, `${utils.getFileName(filePath)}${utils.getFileExtension(filePath)}`)}\n`,
            ),
          );
          utils.log(chalk.green(`File conversion is successful!\n`));
        })
        .catch((e: Error) => {
          utils.error(chalk.red(`Error: ${e}`));

          process.exit(1);
        });
    }
  } catch (e) {
    utils.error(chalk.red(`Error: ${e}`));

    process.exit(1);
  }
})();
