import {AuthUser} from '../../types/models/AuthUser';

export const authRole = {
  admin: [1],
  user: [1, 2],
  customer: [3]
};

export enum RoutePermittedRole {
  Admin = 1,
  User = 2,
  Customer = 3,
  Anonymous = 4
}

export const defaultUser: AuthUser = {
  uid: 'john-alex',
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: 1,
  photoURL: '/assets/images/avatar/A11.jpg',
};
export const initialUrl = '/dashboards/customers-list'; // this url will open after login
