import React from 'react';
import Header from '@/components/navbar/navbar';
import dynamic from 'next/dynamic';

const SideNavbar = dynamic(() => import('@/components/sidebar/sidebar'), { ssr: false });
const Widget = dynamic(() => import('@/components/widget/cardStudent'), { ssr: false });
const Chart1 = dynamic(() => import('@/components/chart/char1'), { ssr: false });

const AdminPage: React.FC = () => {
  return (
    <>
    <main className="mx-36 bg-gray-100 min-h-screen">
      <div className="flex">
        <SideNavbar />
        <div className="flex flex-col flex-grow">
          <Header></Header>
          <div className="flex flex-col justify-center items-center relative z-10 w-4/5 mb-8 mt-4 mx-auto">{/* Added justify-center and items-center classes */}
            <Widget />
          </div>
          <div className="flex flex-col justify-center items-center mt-4 "> {/* Added justify-center and items-center classes */}
            <Chart1 />
          </div>
        </div>
      </div>
    </main>
  </>
  );
};

export default AdminPage;
