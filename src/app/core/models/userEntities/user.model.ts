import { Role } from '../userEntities/role.model';

export interface User {
  id: number;
  name: string;
  contactNumber?: string;
  email: string;
  password: string;
  dateOfBirth?: string; // API returns string
  imageUrl?: string;
  securityQuestion?: string;
  securityAnswer?: string;
  roleId: number;
  role: Role;
}
