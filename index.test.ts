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

        test('should validates number as invalid', async () => {
            // @ts-expect-error
            const result = standardValidate(type('string'), 1);

            await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(`
              [Error: [
                {
                  "message": "must be a string (was a number)",
                  "received": "number",
                  "code": "domain",
                  "expected": "string",
                  "path": []
                }
              ]]
            `);
        });
    });

    describe('object', () => {
        test('should validate object as invalid', async () => {
            // @ts-expect-error
            const result = standardValidate(type({foo: type({bar: 'boolean'})}), {foo: {bar: 10}});

            await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(`
              [Error: [
                {
                  "message": "foo.bar must be boolean (was 10)",
                  "received": "object",
                  "code": "union",
                  "expected": null,
                  "path": [
                    "foo",
                    "bar"
                  ]
                }
              ]]
            `);
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
