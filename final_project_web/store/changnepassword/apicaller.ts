// store/apicaller.ts
 
 import { URL } from "../host";

 export interface ChangePasswordData {
  userId: number;
  newPassword: string;
  oldPassword: string;
}
async function changePassword(data: ChangePasswordData) {
  const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${URL}/changePassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(data),
        });
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.message || 'Failed to change password');
        }
        return json;
    } catch (error) {
        throw error;
    }
}

export default changePassword;
