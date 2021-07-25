import utils from '../src/utils';

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllMocks();
  jest.clearAllMocks();
});

describe("within utils file", () => {
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

  test("getFileExtension should return the output file extension by checking the passed rapameter", () => {
    expect(utils.getFileExtension("C:\\__tests__/\\files\\files.xlsx")).toEqual(".json");
  });

  test("addKeyConnectors should concatenate the parent and child keys in the array in given parameter", () => {
    expect(utils.addKeyConnectors(["parent", "child"])).toEqual("parent.child");
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
});
