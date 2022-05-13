export interface AuthUser {
  id?: number;
  uid?: string;
  userId?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  role?: string[] | string;
  username?: string;
}
