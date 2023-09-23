import { Meta, StoryFn } from '@storybook/react';
import { Header } from './index';

export default {
  title: 'Layouts/app/header',
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = () => <Header />;

export const Sample1 = Template.bind({});
Sample1.storyName = 'Header';
