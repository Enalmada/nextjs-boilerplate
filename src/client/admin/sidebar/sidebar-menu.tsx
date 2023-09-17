import React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const SidebarMenu = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-normal ">{title}</span>
      {children}
    </div>
  );
};
