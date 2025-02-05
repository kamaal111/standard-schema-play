import {expect, test, describe} from 'vitest';
import {z} from 'zod';

import {standardValidate} from '.';

describe('zod', () => {
    describe('string', () => {
        test('validates string', async () => {
            const result = await standardValidate(z.string(), 'hello');

            expect(result).toEqual('hello');
        });

        test('validates number as invalid', async () => {
            // @ts-expect-error
            const result = standardValidate(z.string(), 1);

            expect(result).rejects.toThrowErrorMatchingInlineSnapshot(`
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
