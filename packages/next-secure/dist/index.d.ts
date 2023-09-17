export declare const Default: {
    contentTypeOptions: string;
    contentSecurityPolicy: {
        'base-uri': string;
        'child-src': string;
        'connect-src': string;
        'default-src': string;
        'font-src': string;
        'form-action': string;
        'frame-ancestors': string;
        'frame-src': string;
        'img-src': string;
        'manifest-src': string;
        'media-src': string;
        'object-src': string;
        'prefetch-src': string;
        'script-src': string;
        'style-src': string;
        'worker-src': string;
        mergeDefaultDirectives: boolean;
        reportOnly: boolean;
    };
    frameOptions: string;
    permissionsPolicyDirectiveSupport: string[];
    isDev: boolean;
    referrerPolicy: string;
    xssProtection: string;
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
declare function generateCspTemplate(cspConfig: ContentSecurityPolicyTemplate, cspRules: CspRule[]): ContentSecurityPolicyTemplate[];
export { generateCspTemplate };
