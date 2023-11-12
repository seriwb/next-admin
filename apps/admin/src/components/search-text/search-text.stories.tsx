import { SearchText } from './index';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Search Text',
  component: SearchText,
  decorators: [(story) => <div style={{ width: '400px' }}>{story()}</div>],
} as Meta<typeof SearchText>;

const Template: StoryFn<typeof SearchText> = (args) => {
  return <SearchText {...args} />;
};
export const Sample1 = Template.bind({});
Sample1.storyName = 'label';
Sample1.args = {
  label: "label",
};

export const Sample2 = Template.bind({});
Sample2.storyName = 'no label';
Sample2.args = {
};
