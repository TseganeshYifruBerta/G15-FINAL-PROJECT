export default interface AuthResponse {
  isAuthenticated: boolean;
  error: Error[];
  value: {
    user: {
      id: string;
      email: string;
      role: string;
      fullName: string;
      profilePictureUrl: string;
    };
    token: string;
  };
  message: string;
}
