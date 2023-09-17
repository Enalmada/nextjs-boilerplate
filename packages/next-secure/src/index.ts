function deepMerge<T extends object, S extends object>(target: T, source: S): T & S {
  const output: any = Object.assign({}, target); // using any here to bypass type restrictions, handle with care

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      // @ts-ignore
      if (isObject(source[key])) {
        if (!(key in target)) {
          // @ts-ignore
          Object.assign(output, { [key]: source[key] });
        } else {
          // @ts-ignore
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        // @ts-ignore
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output as T & S; // typecast back to T & S
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// default configuration https://trezy.gitbook.io/next-safe/usage/configuration
export const Default = {
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

export interface CspRule {
  description?: string;
  source?: string;
  'script-src'?: string | boolean;
  'style-src'?: string | boolean;
  'img-src'?: string | boolean;
  'connect-src'?: string | boolean;
  'font-src'?: string | boolean;
  'object-src'?: string | boolean;
  'media-src'?: string | boolean;
  'frame-src'?: string | boolean;
  'worker-src'?: string | boolean;
  'manifest-src'?: string | boolean;
  'prefetch-src'?: string | boolean;
  'base-uri'?: string | boolean;
  'child-src'?: string | boolean;
  'default-src'?: string | boolean;
  'form-action'?: string | boolean;
  'frame-ancestors'?: string | boolean;
}

export interface ContentSecurityPolicyTemplate {
  source?: string;
  contentSecurityPolicy: {
    mergeDefaultDirectives: boolean;
    [key: string]: string | boolean;
  };
  referrerPolicy: string;
  permissionsPolicy?: {
    [key: string]: string | boolean;
  };
  permissionsPolicyDirectiveSupport: any[];
  isDev: boolean;
}
function groupBySource(cspRules: CspRule[]): Record<string, CspRule[]> {
  const grouped: Record<string, CspRule[]> = {};
  cspRules.forEach((rule) => {
    const source = rule.source || '/';
    if (!grouped[source]) {
      grouped[source] = [];
    }
    grouped[source].push(rule);
  });
  return grouped;
}

function generateCspTemplate(
  cspConfig: ContentSecurityPolicyTemplate,
  cspRules: CspRule[]
): ContentSecurityPolicyTemplate[] {
  const groupedRules = groupBySource(cspRules);
  const finalConfigs: ContentSecurityPolicyTemplate[] = [];

  for (const [source, rules] of Object.entries(groupedRules)) {
    const finalConfig: ContentSecurityPolicyTemplate = deepMerge(Default, cspConfig);
    const generatedCsp = { ...finalConfig.contentSecurityPolicy };

    rules.forEach((rule) => {
      for (const [key, value] of Object.entries(rule)) {
        if (key !== 'source') {
          const cspKey = key;
          if (typeof value === 'boolean') {
            generatedCsp[cspKey] = value;
          } else {
            if (generatedCsp[cspKey] === "'none'") {
              generatedCsp[cspKey] = value;
            } else {
              generatedCsp[cspKey] += ' ' + value;
            }
          }
        }
      }
    });

    for (const [key, value] of Object.entries(generatedCsp)) {
      if (typeof value === 'string') {
        generatedCsp[key] = value.trim();
      }
    }

    finalConfigs.push({
      source,
      ...finalConfig,
      contentSecurityPolicy: {
        ...finalConfig.contentSecurityPolicy,
        ...generatedCsp,
      },
    });
  }

  return finalConfigs;
}

export { generateCspTemplate };
