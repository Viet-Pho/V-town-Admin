export interface AuthUser {
  id?: number;
  userId?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  role?: string[] | string;
  username?: string;
}
