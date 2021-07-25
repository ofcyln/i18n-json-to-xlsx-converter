const execa = require("execa");

describe("Retail translation tool CLI", () => {
  describe("in succes state", () => {
    test("does run without an error and converts the XLSX file when arguments are correct", async () => {
      let response = { stdout: "", stderr: "" };

      try {
        response = execa.sync("./index.ts", ["--convert", "__tests__/files/test.xlsx"]);
      } catch (e) {
        expect(e.stderr).toEqual("");
      }
    });

    test("does run without an error and converts the JSON file when arguments are correct", async () => {
      let response = { stdout: "", stderr: "" };

      try {
        response = execa.sync("./index.ts", ["--convert", "__tests__/files/test.json"]);
      } catch (e) {
        expect(e.stderr).toEqual("");
      }
    });
  });
});
