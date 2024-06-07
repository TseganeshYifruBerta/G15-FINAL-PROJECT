// store/apicaller.ts
 const token = localStorage.getItem("token");
 import { URL } from "../host";

async function changePassword(data: { userId: string, newPassword: string, oldPassword: string }) {
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
