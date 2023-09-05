import { SafeParseResult } from 'valibot';
export declare const required: (key: string) => any;
export declare const createEnvSchema: (schemaDefinition: Record<string, any>) => any;
export interface ReducedIssue {
    attribute: string | undefined;
    input: unknown;
    message: string;
}
export declare function validateEnv(schema: any, envVars: Record<string, unknown>, skipEnvValidation?: string | undefined): SafeParseResult<any> | undefined;
