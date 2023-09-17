import React from 'react';
import { Switch } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';

export const DarkModeSwitch = () => {
  const { setTheme, theme } = useNextTheme();
  return (
    <Switch isSelected={theme === 'dark'} onValueChange={(e) => setTheme(e ? 'dark' : 'light')} />
  );
};
