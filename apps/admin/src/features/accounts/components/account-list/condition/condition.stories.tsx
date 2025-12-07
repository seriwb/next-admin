import { Meta, StoryFn } from '@storybook/react';
import { Condition } from './index';
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export default {
  title: 'Features/xxx/ComponentName',
  component: Condition,
} as Meta<typeof Condition>;

const Template: StoryFn<typeof Condition> = (args) => (
  <Condition {...args} />
);

// TODO: API mock sample
// const mockData = [
//   {
//     url: `/api/xxxxxx`,
//     method: 'POST',
//     status: 200,
//     response: [],
//   },
// ];

export const Sample1 = Template.bind({});
Sample1.storyName = 'sample 1';
Sample1.args = {
};
Sample1.parameters = {
  nextjs: {
    appDirectory: true,
  },
  // mockData,
  // TODO: SP view sample
  // layout: 'fullscreen',
  // viewport: {
  //   viewports: INITIAL_VIEWPORTS,
  //   defaultViewport: 'iphonese2',
  // },
};