import { Issue, minLength, object, safeParse, SafeParseResult, string } from 'valibot';

export const required = (key: string): any => string([minLength(1, `${key} required`)]);

export const createEnvSchema = (schemaDefinition: Record<string, any>): any =>
  object(schemaDefinition);

export interface ReducedIssue {
  attribute: string | undefined;
  input: unknown;
  message: string;
}

export function validateEnv(
  schema: any,
  envVars: Record<string, unknown>,
  skipEnvValidation: string | undefined = 'false'
): SafeParseResult<any> | undefined {
  if (skipEnvValidation !== 'true') {
    const parsed = safeParse(schema, envVars);
    if (!parsed.success) {
      const reducedIssues: ReducedIssue[] = reduceIssues(parsed.issues);
      console.error('Issue with environment variables: ' + JSON.stringify(reducedIssues));
      process.exit(1);
    }
    return parsed;
  } else {
    return undefined;
  }
}

function reduceIssues(issues: Issue[]): ReducedIssue[] {
  return issues.map((issue) => ({
    attribute: issue.path?.[0].key,
    input: issue.input,
    message: issue.message,
  }));
}
