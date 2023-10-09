'use client';

import React, { useEffect, useState } from 'react';
import { MoonFilledIcon, SunFilledIcon } from '@/client/components/nextui/icons';
import { useSwitch } from '@nextui-org/react';
import { useIsSSR } from '@react-aria/ssr';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import clsx, { type ClassValue } from 'clsx';
import { useTheme } from 'next-themes';

interface ClassNames {
  base?: ClassValue;
  wrapper?: ClassValue;
}

export interface ThemeSwitchProps {
  id: string;
  className?: string;
  classNames?: ClassNames;
}

export const ThemeSwitch = ({ id, className, classNames }: ThemeSwitchProps) => {
  // Note that docs have some check for isMounted for ssr but i believe isSSR probably covers it
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch

  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const [isThemeLight, setIsThemeLight] = useState(theme === 'light' || isSSR);

  useEffect(() => {
    setIsThemeLight(theme === 'light' || isSSR);
  }, [theme, isSSR]);

  const onChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    isSelected: isThemeLight,
    'aria-label': `Switch to ${isThemeLight ? 'dark' : 'light'} mode`,
    onChange,
  });

  // TODO fix hack_to_stop_ssr_error
  return (
    <Component
      {...getBaseProps({
        className: clsx(
          'px-px transition-opacity hover:opacity-80 cursor-pointer',
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} id={id} aria-labelledby="hack_to_stop_ssr_error" />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              'h-auto w-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-px',
              'px-0',
              'mx-0',
            ],
            classNames?.wrapper
          ),
        })}
      >
        {!isSelected || isSSR ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
      </div>
    </Component>
  );
};
