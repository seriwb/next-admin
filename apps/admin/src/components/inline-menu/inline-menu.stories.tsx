import { InlineMenu } from './index';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Inline Menu',
  component: InlineMenu,
} as Meta<typeof InlineMenu>;

const Template: StoryFn<typeof InlineMenu> = (args) => (
  <div style={{ width: '100px', height: '100px', padding: '1rem 2.5rem', backgroundColor: '#fff' }}>
    <InlineMenu {...args} />
  </div>
);
export const Sample1 = Template.bind({});
Sample1.storyName = 'Menu';
Sample1.args = {
  children: <div>sample</div>,
};
