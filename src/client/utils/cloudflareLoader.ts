// https://developers.cloudflare.com/images/image-resizing/integration-with-frameworks/#nextjs

const normalizeSrc = (src: string): string => {
  return src.startsWith("/") ? src.slice(1) : src;
};

type CloudflareLoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

// eslint-disable-next-line @typescript-eslint/require-await
export default async function cloudflareLoader({
  src,
  width,
  quality,
}: CloudflareLoaderParams): Promise<string> {
  const params: string[] = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(",");
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
