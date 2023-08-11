import { getParamsAndSecrets } from '@/paramsAndSecrets';
import { type SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
  config(input) {
    let profileName;
    switch (input.stage) {
      case 'production':
        profileName = 'lbc-production';
        break;
      case 'staging':
        profileName = 'lbc-staging';
        break;
      case 'dev':
        profileName = 'lbc-dev';
        break;
      default:
        profileName = 'lbc-staging';
    }

    return {
      name: 't3-challenge',
      region: 'us-east-1',
      profile: profileName,
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        bind: getParamsAndSecrets(stack),
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
