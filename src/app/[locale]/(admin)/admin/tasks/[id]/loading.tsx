import Page from './page';

/* clone-code ENTITY_HOOK
{
  "toFile": "src/app/[locale]/(admin)/admin/<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>/[id]/loading.tsx",
}
*/

export default function Loading() {
  return <Page params={{}} />;
}
