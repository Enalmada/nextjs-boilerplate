export interface Tenant {
  id: string;
  name: string | null;
  email: string | null;
  photoUrl: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  customClaims: CustomClaims;
  idToken: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomClaims = { [key: string]: any };
