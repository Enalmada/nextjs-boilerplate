"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = exports.createEnvSchema = exports.required = void 0;
var valibot_1 = require("valibot");
var required = function (key) { return (0, valibot_1.string)([(0, valibot_1.minLength)(1, "".concat(key, " required"))]); };
exports.required = required;
var createEnvSchema = function (schemaDefinition) {
    return (0, valibot_1.object)(schemaDefinition);
};
exports.createEnvSchema = createEnvSchema;
function validateEnv(schema, envVars, skipEnvValidation) {
    if (skipEnvValidation === void 0) { skipEnvValidation = 'false'; }
    if (skipEnvValidation !== 'true') {
        var parsed = (0, valibot_1.safeParse)(schema, envVars);
        if (!parsed.success) {
            var reducedIssues = reduceIssues(parsed.issues);
            console.error('Issue with environment variables: ' + JSON.stringify(reducedIssues));
            process.exit(1);
        }
        return parsed;
    }
    else {
        return undefined;
    }
}
exports.validateEnv = validateEnv;
function reduceIssues(issues) {
    return issues.map(function (issue) {
        var _a;
        return ({
            attribute: (_a = issue.path) === null || _a === void 0 ? void 0 : _a[0].key,
            input: issue.input,
            message: issue.message,
        });
    });
}
