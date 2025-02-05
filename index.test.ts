import {expect, test, describe} from 'vitest';
import {z} from 'zod';
import {type} from 'arktype';

import {standardValidate} from '.';

describe('ark type', () => {
    describe('string', () => {
        test('should validate string', async () => {
            const result = await standardValidate(type('string'), 'hi');

            expect(result).toEqual('hi');
        });

        test.skip('should validates number as invalid', async () => {
            // @ts-expect-error
            const result = standardValidate(type('string'), 1);

            await expect(result).rejects.toThrowErrorMatchingInlineSnapshot();
        });
    });
});

describe('zod', () => {
    describe('string', () => {
        test('should validates string', async () => {
            const result = await standardValidate(z.string(), 'hello');

            expect(result).toEqual('hello');
        });

        test('should validates number as invalid', async () => {
            // @ts-expect-error
            const result = standardValidate(z.string(), 1);

            await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(`
              [Error: [
                {
                  "code": "invalid_type",
                  "expected": "string",
                  "received": "number",
                  "path": [],
                  "message": "Expected string, received number"
                }
              ]]
            `);
        });
    });
});
