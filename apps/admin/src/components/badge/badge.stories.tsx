import { Meta, StoryFn } from '@storybook/react';
import { Badge } from './index';

export default {
  title: 'Components/badge',
  component: Badge,
} as Meta<typeof Badge>;

const Template: StoryFn<typeof Badge> = (args) => <Badge {...args} />;

export const Round = Template.bind({});
Round.args = {
  text: 'NEW',
};

export const Square = Template.bind({});
Square.args = {
  text: 'NEW',
  shape: 'square',
};
