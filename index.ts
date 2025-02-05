import type {StandardSchemaV1} from '@standard-schema/spec';

function transformArkTypeErrorToConfirm<T extends StandardSchemaV1>(
    issues: Array<StandardSchemaV1.Issue>,
    input: StandardSchemaV1.InferInput<T>
) {
    return issues.map(issue => {
        const pathString = issue.path?.toString();

        return {
            message: issue.toString(),
            received: typeof input,
            code: 'code' in issue ? issue.code : null,
            path: pathString ? pathString.split(',') : [],
        };
    });
}

export async function standardValidate<T extends StandardSchemaV1>(
    schema: T,
    input: StandardSchemaV1.InferInput<T>
): Promise<StandardSchemaV1.InferOutput<T>> {
    let result = schema['~standard'].validate(input);
    if (result instanceof Promise) result = await result;

    // if the `issues` field exists, the validation failed
    if (result.issues) {
        let stringifiedIssues: string;
        try {
            stringifiedIssues = JSON.stringify(result.issues, null, 2);
        } catch (error) {
            // @ts-ignore
            stringifiedIssues = JSON.stringify(transformArkTypeErrorToConfirm(result.issues, input), null, 2);
        }

        throw new Error(stringifiedIssues);
    }

    return result.value;
}
