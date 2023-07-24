import { Button as NextUIButton, type ButtonProps as NextUIButtonProps } from '@nextui-org/button';

interface ButtonProps extends NextUIButtonProps {
  children: React.ReactNode;
  hoverIndication: boolean;
}

export function Button({
  color = 'primary',
  radius = 'sm',
  hoverIndication = true,
  ...props
}: ButtonProps) {
  // Apply some hover effects
  let className = props.className;

  if (hoverIndication && color == 'primary') {
    className = `hover:bg-blue-700 ${props.className}`;
  }

  if (hoverIndication && color == 'default') {
    className = `hover:bg-gray-400 ${props.className}`;
  }

  return (
    <NextUIButton color={color} radius={radius} {...props} className={className}>
      {props.children}
    </NextUIButton>
  );
}
