// pages/passwordChangePage.tsx
import React from 'react';
import dynamic from "next/dynamic";

const PasswordChangeComponent = dynamic(
  () => import("@/components/changepassword/changepasswordpopup"),
  {
    ssr: false,
  }
);
const PasswordChangePage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Change Your Password</h1>
            <PasswordChangeComponent />
        </div>
    );
};

export default PasswordChangePage;
