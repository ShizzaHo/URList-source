import { validateJSON } from './index';

test('Checking the JSON validity module', () => {
    const simpleJson1 = JSON.stringify({
        meta: {},
        categories: {},
        links: {},
    });

    const simpleJson2 = '{"meta":{},"categories":{},"links":{}}'

    const simpleJson3 = "ERROR";
    
    const simpleJson4 = 'meta:{},categories:{},links:{}}'

    expect(validateJSON(simpleJson1)).toBe(true);
    expect(validateJSON(simpleJson2)).toBe(true);
    expect(validateJSON(simpleJson3)).toBe(false);
    expect(validateJSON(simpleJson4)).toBe(false);
});