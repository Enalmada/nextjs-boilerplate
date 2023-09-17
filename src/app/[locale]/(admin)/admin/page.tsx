import React from 'react';

export const metadata = {
  title: 'Admin',
};

export default function Page() {
  return (
    <div className=" h-full">
      <div className="mx-auto flex w-full max-w-[90rem] flex-wrap justify-center gap-4  px-4 pt-3 sm:pt-10 lg:px-0 xl:flex-nowrap xl:gap-12">
        <div className="mt-6  flex w-full flex-col gap-6">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Admin Dashboard</h3>
            <div className="grid w-full grid-cols-1 justify-center gap-5  md:grid-cols-2 2xl:grid-cols-3">
              Reporting TBD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
