import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUniversity, faPhone, faVenusMars, faBriefcase, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ConnectedUserProfilePage from './editprofile';
import Modal from '@/components/modal';
import { fetchUserProfile, UserProfile2, updateUserProfilePhoto } from '@/store/account/api_caller';
import { showToast } from '@/components/popup';
import { CldUploadWidget, getCldImageUrl } from 'next-cloudinary';
const jwt = require("jsonwebtoken");

config.autoAddCss = false;

const ProfileCard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile2 | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwt.decode(storedToken);
      if (decodedToken && typeof decodedToken === 'object') {
        setUserId(decodedToken.id);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async (token: string, userId: number) => {
      try {
        const data = await fetchUserProfile(token, userId);
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (token && userId !== null) {
      fetchData(token, userId);
    }
  }, [token, userId]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePhotoUpload = async (result: any) => {
    if (result.event === 'success') {
      const publicId = result.info.public_id;
      const imageUrl = getCldImageUrl({
        width: 144,
        height: 144,
        src: publicId
      });

      console.log('Image updated successfully', imageUrl); // Debug log

      if (token && userId !== null) {
        try {
          await updateUserProfilePhoto(token, userId, imageUrl);
          showToast('Profile photo updated successfully', 'success');
          window.location.reload();
        } catch (error) {
          console.error('Error updating profile photo:', error);
        }
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-[600px]">
      <div className="relative max-w-5xl w-full bg-white rounded-3xl shadow-lg">
        <div className="relative h-40 rounded-t-3xl overflow-hidden">
          <Image
            src="/assets/3168310.jpg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative flex items-center p-8">
          <div className="relative -mt-20">
            <div className="relative">
              <Image
                className="w-36 h-36 rounded-full border-4 border-white bg-white shadow-md"
                src={userProfile?.photoUrl || "/assets/pro2.png"}
                alt="Profile Image"
                width={144}
                height={144}
              />
              <CldUploadWidget uploadPreset="u06vgrf1" onUpload={handlePhotoUpload}>
                {({ open }) => (
                  <button
                    className="absolute bottom-0 right-0 text-primary text-xl py-1 px-2 bg-white rounded-full drop-shadow-md"
                    onClick={() => open()}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>
          <div className="ml-8 relative -mt-8">
            <h3 className="text-3xl font-bold text-primary drop-shadow-md">{userProfile?.fullName || "Name"}</h3>
            <p className="text-lg font-medium text-gray-800 drop-shadow-md">{userProfile?.role || "Role"}</p>
            <div className="text-gray-600 mt-1">
              <span className="text-2xs drop-shadow-md">{userProfile?.shortBio || "Enter a bio..."}</span>
            </div>
          </div>
        </div>
        <div className="px-8 pb-8">
          <div className="mt-6 flex flex-row">
            <div className='w-1/2'>
              <div className="flex items-center text-gray-600 mb-2">
                <FontAwesomeIcon icon={faUniversity} className="h-5 w-5 text-red-800" />
                <span className="ml-3 drop-shadow-md">{userProfile?.university || "University"}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5 text-blue-500" />
                <a href={userProfile?.linkedin || "https://www.linkedin.com/"} className="ml-3 drop-shadow-md">Linkedin</a>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <FontAwesomeIcon icon={faGithub} className="h-5 w-5 text-gray-800" />
                <a href={userProfile?.github || "https://github.com/"} className="ml-3">Github</a>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <FontAwesomeIcon icon={faPhone} className="h-5 w-5 text-green-500" />
                <span className="ml-3 drop-shadow-md">{userProfile?.phoneNumber || "Phone Number"}</span>
              </div>
            </div>
            <div className='w-1/2'>
              <div className="flex items-center text-gray-600 mb-2">
                <FontAwesomeIcon icon={faVenusMars} className="h-5 w-5 text-primary" />
                <span className="ml-3 drop-shadow-md">{userProfile?.gender || "Gender"}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <FontAwesomeIcon icon={faBriefcase} className="h-5 w-5 text-yellow-800" />
                <span className="ml-3 drop-shadow-md">{userProfile?.department || "Department"}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-300"
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faPen} className="h-6 w-6 text-gray-500" />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ConnectedUserProfilePage />
      </Modal>
    </div>
  );
};

export default ProfileCard;
