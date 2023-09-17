import React from 'react';

import { useSidebarContext } from '../layout/layout-context';
import { StyledBurgerButton } from './navbar.styles';

export const BurguerButton = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  );
};
