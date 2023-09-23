import { SignIn } from '@/features/auth/components/signin';
import { AuthLayout } from './index';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Layouts/auth',
  component: AuthLayout,
} as Meta<typeof AuthLayout>;

const Template: StoryFn<typeof AuthLayout> = (args) => <AuthLayout {...args} />;

export const Sample1 = Template.bind({});
Sample1.storyName = 'default';
Sample1.args = {
  children: <SignIn />,
};
Sample1.parameters = {
  nextjs: {
    appDirectory: true,
  },
};
