"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCspTemplate = exports.Default = void 0;
function deepMerge(target, source) {
    var output = Object.assign({}, target); // using any here to bypass type restrictions, handle with care
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(function (key) {
            var _a, _b;
            // @ts-ignore
            if (isObject(source[key])) {
                if (!(key in target)) {
                    // @ts-ignore
                    Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                }
                else {
                    // @ts-ignore
                    output[key] = deepMerge(target[key], source[key]);
                }
            }
            else {
                // @ts-ignore
                Object.assign(output, (_b = {}, _b[key] = source[key], _b));
            }
        });
    }
    return output; // typecast back to T & S
}
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
// default configuration https://trezy.gitbook.io/next-safe/usage/configuration
exports.Default = {
    contentTypeOptions: 'nosniff',
    contentSecurityPolicy: {
        'base-uri': "'none'",
        'child-src': "'none'",
        'connect-src': "'self'",
        'default-src': "'self'",
        'font-src': "'self'",
        'form-action': "'self'",
        'frame-ancestors': "'none'",
        'frame-src': "'none'",
        'img-src': "'self'",
        'manifest-src': "'self'",
        'media-src': "'self'",
        'object-src': "'none'",
        'prefetch-src': "'self'",
        'script-src': "'self'",
        'style-src': "'self'",
        'worker-src': "'self'",
        mergeDefaultDirectives: false,
        reportOnly: false,
    },
    frameOptions: 'DENY',
    permissionsPolicyDirectiveSupport: ['proposed', 'standard'],
    isDev: false,
    referrerPolicy: 'no-referrer',
    xssProtection: '1; mode=block',
};
function groupBySource(cspRules) {
    var grouped = {};
    cspRules.forEach(function (rule) {
        var source = rule.source || '/';
        if (!grouped[source]) {
            grouped[source] = [];
        }
        grouped[source].push(rule);
    });
    return grouped;
}
function generateCspTemplate(cspConfig, cspRules) {
    var groupedRules = groupBySource(cspRules);
    var finalConfigs = [];
    var _loop_1 = function (source, rules) {
        var finalConfig = deepMerge(exports.Default, cspConfig);
        var generatedCsp = __assign({}, finalConfig.contentSecurityPolicy);
        rules.forEach(function (rule) {
            for (var _i = 0, _a = Object.entries(rule); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (key !== 'source') {
                    var cspKey = key;
                    if (typeof value === 'boolean') {
                        generatedCsp[cspKey] = value;
                    }
                    else {
                        if (generatedCsp[cspKey] === "'none'") {
                            generatedCsp[cspKey] = value;
                        }
                        else {
                            generatedCsp[cspKey] += ' ' + value;
                        }
                    }
                }
            }
        });
        for (var _c = 0, _d = Object.entries(generatedCsp); _c < _d.length; _c++) {
            var _e = _d[_c], key = _e[0], value = _e[1];
            if (typeof value === 'string') {
                generatedCsp[key] = value.trim();
            }
        }
        finalConfigs.push(__assign(__assign({ source: source }, finalConfig), { contentSecurityPolicy: __assign(__assign({}, finalConfig.contentSecurityPolicy), generatedCsp) }));
    };
    for (var _i = 0, _a = Object.entries(groupedRules); _i < _a.length; _i++) {
        var _b = _a[_i], source = _b[0], rules = _b[1];
        _loop_1(source, rules);
    }
    return finalConfigs;
}
exports.generateCspTemplate = generateCspTemplate;
