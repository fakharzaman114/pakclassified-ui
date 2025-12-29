export interface Signup {
  roleId: number;
  name: string;
  contactNumber?: string;
  dateOfBirth?: string;
  email: string;
  password: string;
  confirmPassword: string;
  imageURL?: string;
  securityQuestion?: string;
  securityAnswer?: string;
}
