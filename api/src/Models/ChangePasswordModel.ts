export interface ChangePasswordModel {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponseModel {
  token: string;
}
