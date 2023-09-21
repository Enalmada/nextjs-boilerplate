import React from 'react';

interface Props {
  adminNavHeader: AdminNavHeader;
}

export interface AdminNavHeader {
  name: string;
  name2: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = ({ adminNavHeader }: Props) => {
  return (
    <div className="w-full ">
      <div className="flex items-center gap-2">
        {adminNavHeader.logo}
        <div className="flex flex-col gap-4">
          <h3 className="m-0 -mb-4 whitespace-nowrap text-xl font-medium text-default-900">
            {adminNavHeader.name}
          </h3>
          <span className="text-xs font-medium text-default-500">{adminNavHeader.name2}</span>
        </div>
      </div>
    </div>
  );
};
