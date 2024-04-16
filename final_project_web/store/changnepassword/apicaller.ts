// store/apicaller.ts
 const token = localStorage.getItem("token");
async function changePassword(data: { userId: string, newPassword: string, oldPassword: string }) {
    try {
        const response = await fetch("http://localhost:5000/changePassword", {
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
