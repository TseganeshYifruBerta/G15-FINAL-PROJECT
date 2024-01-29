import React from 'react';
import Header from '@/components/navbar/navbar';
import Widget from '@/components/widget/card';
import dynamic from 'next/dynamic';

const SideNavbar = dynamic(() => import('@/components/sidebar/sidebar'), { ssr: false });
const Chart2 = dynamic(() => import('@/components/chart/chart'), { ssr: false });
const Chart1 = dynamic(() => import('@/components/chart/barchart'), { ssr: false });

const AdminPage: React.FC = () => {
  return (
    <>
      <main className="mx-36 bg-gray-100 min-h-screen justify-center items-center"> {/* Added justify-center and items-center */}
        <div className="flex">
          <SideNavbar />

          <div className="flex flex-col flex-grow">
            <Header></Header>

            <div className="flex flex-row justify-center items-center w-4/5 mb-8 mt-4 mx-auto gap-4">
              <div className="relative z-10 w-1/2">
                <Widget type="user" />
              </div>
              <div className="relative z-10 w-1/2">
                <Widget type="agent" />
              </div>
              <div className="relative z-10 w-1/2">
                <Widget type="form" />
              </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-4 gap-4">
              <div className="flex justify-center"> {/* Added justify-center */}
                <Chart1 />
              </div>
              <div className="flex justify-center"> {/* Added justify-center */}
                <Chart2 />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminPage;
