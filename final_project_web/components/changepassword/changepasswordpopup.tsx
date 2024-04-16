// components/PasswordChangeComponent.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, passwordChangeSuccess, passwordChangeFailure } from '@/store/changnepassword/slicereducer';
import changePassword from '@/store/changnepassword/apicaller';
import { showToast } from '../popup';
import { AiOutlineClose } from 'react-icons/ai';

const PasswordChangeComponent: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async () => {
        dispatch(startLoading());
        try {
            await changePassword({ userId, newPassword, oldPassword });
            dispatch(passwordChangeSuccess());
            showToast(`Password changed successfully`, "success");
            setShowForm(false);
        } catch (error) {
            dispatch(passwordChangeFailure((error as Error).message));
          
            showToast('Error deleting user: ' + (error as Error).message, 'error');
        }
    };

    return (
        <>
            <button
                className="text-white bg-gradient-to-r from-[rgb(145,154,243)] to-[#7983FB] hover:bg-gradient-to-br font-bold py-3 md:py-2 px-4 md:px-3 rounded-xl flex items-center shadow-xl transition-transform duration-200 ease-in-out transform hover:scale-105 mr-3 text-sm sm:text-sm md:text-base"
                onClick={() => setShowForm(true)}
            >
                Change Password
            </button>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center rounded-xl items-center">
                    <div className="bg-white p-8 rounded-xl shadow-lg relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            <AiOutlineClose size={24} />
                        </button>

                        <div>
                        <div className="mb-2">
                                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
                                <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                                <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md mb-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <button onClick={handleSubmit}  type="submit" className="bg-[#7983FB] bg-opacity-30 text-[#7983FB] hover:bg-[#7983FB] hover:bg-opacity-60 font-bold py-2 px-4 rounded">
                                Submit
                            </button>
                     </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PasswordChangeComponent;