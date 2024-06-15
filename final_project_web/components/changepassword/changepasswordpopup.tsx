import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChangePasswordData } from '@/store/changnepassword/apicaller';
import changePassword from '@/store/changnepassword/apicaller';
import { showToast } from '../popup';
import { AiOutlineClose } from 'react-icons/ai';
const jwt = require("jsonwebtoken");

interface PasswordChangeComponentProps {
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
}

const PasswordChangeComponent: React.FC<PasswordChangeComponentProps> = ({ showForm, setShowForm }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const decodedToken: any = jwt.decode(token);
      if (decodedToken && typeof decodedToken === 'object' && decodedToken.id) {
        setUserId(Number(decodedToken.id));
      }
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === null) {
      showToast('User ID is missing', 'error');
      return;
    }
    

    try {
      await changePassword({ userId, newPassword, oldPassword });
      showToast(`Password changed successfully`, "success");
      setShowForm(false);
    } catch (error) {
      showToast('Error changing password: ' + (error as Error).message, 'error');
    }
  };
console.log('Userid: ' ,userId);
console.log('new password: ' ,newPassword);
console.log('old password', oldPassword)
  return (
    <>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center rounded-xl items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <AiOutlineClose size={24} />
            </button>
            <form onSubmit={onSubmit}>
              <div className="mb-2">
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md mb-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {newPassword.length <= 6 && (
    <p className="text-red-500 text-xs mt-1">Password must be longer than 6 characters.</p>
  )}
              </div>
              <button type="submit" className="bg-[#7983FB] mt-3 bg-opacity-30 rounded-lg shadow-lg text-[#7983FB] hover:bg-[#7983FB] hover:bg-opacity-60 font-bold py-2 px-4 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordChangeComponent;