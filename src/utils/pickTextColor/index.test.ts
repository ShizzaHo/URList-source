import { pickTextColor } from "./index";

test('Checking for automatic color selection', () => {
    expect(pickTextColor("#000000", "#ffffff", "#000000")).toBe("#ffffff");
    expect(pickTextColor("#ffffff", "#ffffff", "#000000")).toBe("#000000");
});