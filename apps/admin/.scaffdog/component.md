---
name: 'component'
root: './src/components'
output: '**/*'
ignore: []
questions:
  name: 'Please enter component name:'
---

# `{{ inputs.name }}/index.ts`

```typescript
export * from './{{ inputs.name }}';
```

# `{{ inputs.name }}/{{ inputs.name }}.tsx`

```typescript
import { clsx } from 'clsx';
import ss from './{{ inputs.name }}.module.scss';

type Props = {
};

export const {{ inputs.name | pascal }} = (props: Props) => {
  return (
    <div className={ss.container}>
    </div>
  );
};
```

# `{{ inputs.name }}/{{ inputs.name }}.module.scss`

```css
@use 'styles/utils';

.container {
}
```

# `{{ inputs.name }}/{{ inputs.name }}.stories.tsx`

```typescript
import { Meta, StoryFn } from '@storybook/react';
import { {{ inputs.name | pascal }} } from './index';
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export default {
  title: 'Components/xxx/ComponentName',
  component: {{ inputs.name | pascal }},
} as Meta<typeof {{ inputs.name | pascal }}>;

const Template: StoryFn<typeof {{ inputs.name | pascal }}> = (args) => (
  <{{ inputs.name | pascal }} {...args} />
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
```
