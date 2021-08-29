import utils from '../src/utils';

afterEach(() => {
  jest.clearAllMocks();
});

const info = console.info;
const error = console.error;

describe("within utils", () => {
  test("documentSavePath should include the filename passed as a parameter", () => {
    expect(utils.documentSavePath("", "fileName.file")).toContain(
      "fileName.file"
    );
  });

  test("getFileName should create a fileName when a file path passed as a parameter", () => {
    expect(utils.getFileName("C:\\__tests__\\files\\files.xlsx")).toEqual("files");
  });

  test("isJSON should return true by checking the passed rapameter if it is equal to JSON or not", () => {
    expect(utils.isJSON("json")).toBe(true);
  });

  test("isXLSX should return true by checking the passed rapameter if it is equal to XLSX or not", () => {
    expect(utils.isXLSX("xlsx")).toBe(true);
  });

  test("getSourceFileType should return return the file extension from the file path", () => {
    expect(utils.getSourceFileType("C:\\__tests__\\files\\files.xlsx")).toBe("xlsx");
  });

  test("getFileExtension should return the output file extension by checking the passed parameter", () => {
    expect(utils.getFileExtension("C:\\__tests__/\\files\\files.xlsx")).toEqual(".json");
  });

  test("parseErrorMessage should parse the console warn with the provided error message", () => {
    utils.parseErrorMessage = jest.fn();
    utils.parseErrorMessage('error message');

    expect(utils.parseErrorMessage).toHaveBeenCalledWith('error message');
  });

  describe("within createProcessMessageByType method", () => {
    beforeEach(() => {
      jest.spyOn(console, 'info');
    });

    afterAll(() => {
      console.info = info;
    });

    describe('when XLSX passed as sourceFileType parameter', () => {
      it('should parse correct message when fileType parameter is XLSX', () => {
        utils.createProcessMessageByType = jest.fn(() => '\nProcessing! \nConverting XLSX to JSON for the file test.xlsx');
        utils.createProcessMessageByType('test.xlsx', 'xlsx');

        expect(utils.createProcessMessageByType).toHaveBeenCalledWith('test.xlsx', 'xlsx');
        expect(utils.createProcessMessageByType).toHaveReturnedWith('\nProcessing! \nConverting XLSX to JSON for the file test.xlsx');
      });
    });

    describe('when JSON passed as sourceFileType parameter', () => {
      it('should parse correct message when fileType parameter is JSON', () => {
        utils.createProcessMessageByType = jest.fn(() => '\nProcessing! \nConverting JSON to XLSX for the file test.json');
        utils.createProcessMessageByType('test.json', 'json');

        expect(utils.createProcessMessageByType).toHaveBeenCalledWith('test.json', 'json');
        expect(utils.createProcessMessageByType).toHaveReturnedWith('\nProcessing! \nConverting JSON to XLSX for the file test.json');
      });

      it('should parse plural file message when isMultipleJSONFilesValid parameter is provided', () => {
        utils.createProcessMessageByType = jest.fn(() => '\nProcessing! \nConverting JSON to XLSX for the files test.json, test2.json');
        utils.createProcessMessageByType('test.json, test2.json', 'json', true);

        expect(utils.createProcessMessageByType).toHaveBeenCalledWith('test.json, test2.json', 'json', true);
        expect(utils.createProcessMessageByType).toHaveReturnedWith('\nProcessing! \nConverting JSON to XLSX for the files test.json, test2.json');
      });
    });
  });

  test("addKeyConnectors should concatenate the parent and child keys in the array in given parameter", () => {
    expect(utils.addKeyConnectors(["parent", "child"])).toEqual("parent.child");
  });

  describe("within isMultipleJSONFilePathsValid method", () => {
    it('should chek if the file is multiple', () => {
      expect(utils.isMultipleJSONFilePathsValid('test.json, test2.json')).toBe(true);
    });

    it('should chek if the file is not multiple', () => {
      expect(utils.isMultipleJSONFilePathsValid('test.json')).toBe(false);
    });

    it('should chek if the file is not multiple when provided multiple path has no json files', () => {
      expect(utils.isMultipleJSONFilePathsValid('test.json, test')).toBe(false);
    });

    it('should chek if the file is not multiple when provided multiple path includes other than json files', () => {
      expect(utils.isMultipleJSONFilePathsValid('test.json, test.xlsx')).toBe(false);
    });

    it('should chek if the file is not multiple when provided multiple path includes other than json files - 2', () => {
      expect(utils.isMultipleJSONFilePathsValid('test.json, test.jso')).toBe(false);
    });
  });

  describe("within getJSONFilePaths method", () => {
    it('should return multiple file paths in an array', () => {
      expect(utils.getJSONFilePaths('test.json, test2.json')).toEqual(['test.json', 'test2.json']);
    });

    it('should trim empty spaces in the provided paths and return an array', () => {
      expect(utils.getJSONFilePaths(' test.json,  test2.json')).toEqual(['test.json', 'test2.json']);
    });
  });

  describe("with writeByCheckingParent method", () => {
    test("it should concatenate the parentKey and key if both parameters are given", () => {
      expect(utils.writeByCheckingParent("parentKey", "key")).toEqual(
        "parentKey.key"
      );
    });

    test("it should return only the given key itself if parentKey is not given", () => {
      expect(utils.writeByCheckingParent(null, "key")).toEqual("key");
    });
  });

  test("createPathByCheckingSpaceCharacter should concatenate space character(s) if there are in the provided path as an argument", () => {
    const folderPathArray = [
      "C:\\Users\\user\\Onedrive",
      "-",
      "OFC\\desktop\\files\\translation",
      "files\\translations.xlsx",
    ];

    const concatenatedPath =
      "C:\\Users\\user\\Onedrive - OFC\\desktop\\files\\translation files\\translations.xlsx";

    expect(
      utils.createPathByCheckingSpaceCharacter(folderPathArray)
    ).toEqual(concatenatedPath);
  });

  describe("within checkForMultipleJSONFileErrors method", () => {
    beforeEach(() => {
      jest.spyOn(console, 'error');
    });

    afterAll(() => {
      console.error = error;
    });

    describe('when multiple file path parameters are passed with comma', () => {
      it('should parse error message when filePath parameter includes just one JSON file extensions', () => {
        utils.checkForMultipleJSONFileErrors = jest.fn(() => 'One of the multiple path entries of the JSON file path is wrong.');
        utils.checkForMultipleJSONFileErrors('test.json, test2.js', process);

        expect(utils.checkForMultipleJSONFileErrors).toHaveBeenCalledWith('test.json, test2.js', process);
      });

      it('should parse error message when filePath parameter includes a file extension with no support', () => {
        utils.checkForMultipleJSONFileErrors = jest.fn(() => 'Multiple file conversion only works for JSON files.');
        utils.checkForMultipleJSONFileErrors('test.js, ', process);

        expect(utils.checkForMultipleJSONFileErrors).toHaveBeenCalledWith('test.js, ', process);
      });
    });
  });
});
