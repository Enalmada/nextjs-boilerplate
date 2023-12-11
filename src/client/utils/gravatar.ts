export async function sha256(text: string) {
  const utf8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

type GravatarFallback =
  | '404'
  | 'mp'
  | 'identicon'
  | 'monsterid'
  | 'wavatar'
  | 'retro'
  | 'robohash'
  | 'blank';

interface GravatarOptions {
  fallback?: GravatarFallback;
}

export async function createGravatarUrl(
  email: string | undefined | null,
  { fallback }: GravatarOptions
) {
  const sanitizedEmail = email ? email.trim().toLowerCase() : '';
  const hash = await sha256(sanitizedEmail);
  return `https://www.gravatar.com/avatar/${hash}?d=${fallback}`;
}
