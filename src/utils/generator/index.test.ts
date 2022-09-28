import { generateCategoryID, generateExportFileID } from "./index";

test('Checking ID generation', () => {
    expect(generateCategoryID().length).toBe(13);
});

test('Checking file ID generation', () => {
    expect(generateExportFileID().length).toBe(13);
});