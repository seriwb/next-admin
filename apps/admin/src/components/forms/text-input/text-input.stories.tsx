import { useForm } from 'react-hook-form';
import { TextInput } from './index';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/forms/text-input',
  component: TextInput,
  decorators: [(story) => <div style={{ width: '400px' }}>{story()}</div>],
} as Meta<typeof TextInput>;

const Template: StoryFn<typeof TextInput> = (args) => {
  const { register } = useForm({
    defaultValues: { name: '' },
  });

  return <TextInput {...args} register={register} />;
};
export const Sample1 = Template.bind({});
Sample1.storyName = 'text';
Sample1.args = {
  name: 'name',
  label: 'Text',
  placeholder: 'enter...',
};

export const Sample2 = Template.bind({});
Sample2.storyName = 'password';
Sample2.args = {
  name: 'name',
  label: 'Password',
  required: true,
  type: 'password',
  placeholder: 'enter...',
};

export const Sample3 = Template.bind({});
Sample3.storyName = 'search';
Sample3.args = {
  name: 'name',
  label: 'Search',
  type: 'search',
  placeholder: 'enter...',
};

export const Sample4 = Template.bind({});
Sample4.storyName = 'email';
Sample4.args = {
  name: 'name',
  label: 'Email',
  type: 'email',
  placeholder: 'sample@sample.com',
};
