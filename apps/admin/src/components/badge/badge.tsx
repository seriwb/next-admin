import { clsx } from 'clsx';
import ss from './badge.module.scss';

export type Color = 'info';

type Props = {
  color?: Color;
  text: string;
  shape?: 'round' | 'square';
};

export const Badge = ({ color = 'info', text, shape = 'round' }: Props) => {
  return <div className={clsx(ss.container, ss[color], ss[shape])}>{text}</div>;
};
