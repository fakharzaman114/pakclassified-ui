import { User } from '../userEntities/user.model';

export interface AuthResponse {
  token: string;
  payload: User;
}
