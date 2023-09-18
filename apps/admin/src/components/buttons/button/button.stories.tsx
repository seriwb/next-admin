
import { Button } from './button';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/buttons/button',
  component: Button,
} as Meta<typeof Button>;

export const DefaultRound: StoryFn<typeof Button> = () => (
  <div style={{ width: '130px' }}>
    <Button
      label='login'
      onClick={() => {
        return;
      }}
    />
  </div>
);
export const Square: StoryFn<typeof Button> = () => (
  <div style={{ width: '130px' }}>
    <Button
      label='reset'
      shape='square'
      onClick={() => {
        return;
      }}
    />
  </div>
);
