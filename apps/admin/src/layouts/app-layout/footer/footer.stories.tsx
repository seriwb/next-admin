import { Meta, StoryFn } from '@storybook/react';
import { Footer } from './index';

export default {
  title: 'Layouts/app/footer',
  component: Footer,
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = () => <Footer />;

export const Sample1 = Template.bind({});
Sample1.storyName = 'Footer';
