export interface User {
  uid?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  isAdmin?: boolean;
  createdAt?: any;
}
