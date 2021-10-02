export interface FacebookResponse {
  displayName: string;
  name: { familyName: string; givenName: string; middleName: string };
  photos: Array<{ value: string }>;
  emails: Array<{ value: string }>;
}
